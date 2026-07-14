import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import { savePendingAuth } from "./authStorage";
import { signup } from "../../Services/AuthService";
import { COUNTRY_OPTIONS, DEFAULT_COUNTRY } from "../../constants/countries";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
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
      const { data } = await signup({
        name: fullName.trim(),
        email: email.trim(),
        password,
        country,
      });

      const pendingUser = {
        mode: "signup",
        id: data._id,
        name: data.name,
        fullName: data.name,
        email: data.email,
        country: data.country || data.locationPreference || country,
        token: data.token,
      };

      savePendingAuth(pendingUser);
      navigate("/verify-otp", { state: pendingUser });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canContinue = fullName.trim() && email.trim() && password.trim() && country && !isSubmitting;

  return (
    <AuthShell>
      <form onSubmit={handleSubmit} >
        <section className="px-5 py-7 bg-white rounded-t-lg">
          <h1 className="text-center text-2xl font-bold text-[#050b1d]">
            Create an account
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Join to read verified news articles
          </p>

          <div className="mt-7">
            <p className="mb-1 text-sm font-semibold text-slate-950">Sign up</p>
          </div>

          <label className="mt-6 block text-sm font-semibold text-slate-500">
            Full Name
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full border border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 shadow-sm outline-none focus:border-[#c6cbdb]"
              required
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-500">
            Email Address
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="john@example.com"
              className="mt-1 w-full border border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 shadow-sm outline-none focus:border-[#c6cbdb]"
              required
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-500">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="P*******t"
              className="mt-1 w-full border border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 shadow-sm outline-none focus:border-[#c6cbdb]"
              required
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-500">
            Location Preference
            <select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="mt-1 w-full border border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 shadow-sm outline-none focus:border-[#c6cbdb]"
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
            disabled={!canContinue}
            className="mt-6 w-full rounded-xl bg-[rgb(0,150,199)] py-2.5 text-sm font-bold text-white transition hover:bg-[rgb(1,130,173)] disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Sending OTP..." : "Continue with Email"}
          </button>
        </section>

        <footer className="border-t border-slate-100 px-5 py-6 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-white">
          Already have an account?{" "}
          <Link to="/signin" className="font-bold text-[#071127] dark:bg-slate-800 dark:text-white">
            <span className="underline decoration-white">Sign in</span>
          </Link>
        </footer>
      </form>
    </AuthShell>
  );
}

export default Signup;