import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COUNTRY_OPTIONS, DEFAULT_COUNTRY } from "../../constants/countries";
import { login, signup } from "../../Services/AuthService";
import { savePendingAuth } from "./authStorage";

function AuthPromptModal({ onClose }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const payload = { email: email.trim(), password, country };
      const { data } =
        mode === "signup"
          ? await signup({ ...payload, name: name.trim() })
          : await login(payload);

      const responseUser = data.user || data;
      const pendingUser = {
        mode,
        id: responseUser._id || responseUser.id,
        name: responseUser.name || name.trim(),
        fullName: responseUser.name || name.trim(),
        email: responseUser.email || email.trim(),
        country: responseUser.country || responseUser.locationPreference || country,
        token: data.token,
      };

      savePendingAuth(pendingUser);
      navigate("/verify-otp", { state: pendingUser });
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    email.trim() &&
    password.trim() &&
    country &&
    (mode === "signin" || name.trim()) &&
    !isSubmitting;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[420px] rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Close sign in prompt"
        >
          <X className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit} className="px-6 py-7">
          <h2 className="pr-10 text-2xl font-bold text-[#050b1d] dark:text-white">
            Keep reading with Briefly
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Sign in or create an account to personalize your news feed.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-md bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded px-3 py-2 text-sm font-semibold transition ${
                mode === "signin"
                  ? "bg-white text-[#050b1d] shadow-sm dark:bg-slate-950 dark:text-white"
                  : "text-slate-500 dark:text-slate-300"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded px-3 py-2 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-white text-[#050b1d] shadow-sm dark:bg-slate-950 dark:text-white"
                  : "text-slate-500 dark:text-slate-300"
              }`}
            >
              Sign up
            </button>
          </div>

          {mode === "signup" && (
            <label className="mt-5 block text-sm font-semibold text-slate-900 dark:text-white">
              Full Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                className="mt-1 w-full border border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 outline-none focus:border-[#050b1d] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                required={mode === "signup"}
              />
            </label>
          )}

          <label className="mt-5 block text-sm font-semibold text-slate-900 dark:text-white">
            Email Address
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className="mt-1 w-full border border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 outline-none focus:border-[#050b1d] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-900 dark:text-white">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="mt-1 w-full border border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 outline-none focus:border-[#050b1d] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-900 dark:text-white">
            Location Preference
            <select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="mt-1 w-full border border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 outline-none focus:border-[#050b1d] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {error && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 w-full rounded-xl bg-[rgb(0,150,199)] py-2.5 text-sm font-bold text-white transition hover:bg-[rgb(1,130,173)] disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Sending OTP..." : "Continue with Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPromptModal;