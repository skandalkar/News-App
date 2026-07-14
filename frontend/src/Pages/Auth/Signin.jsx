import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import { savePendingAuth } from "./authStorage";
import { login } from "../../Services/AuthService";
import { COUNTRY_OPTIONS, DEFAULT_COUNTRY } from "../../constants/countries";

function Signin() {
  const navigate = useNavigate();
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
      const { data } = await login({
        email: email.trim(),
        password,
        country,
      });

      const pendingUser = {
        mode: "signin",
        id: data.user?._id,
        name: data.user?.name,
        fullName: data.user?.name,
        email: data.user?.email || email.trim(),
        country: data.user?.country || data.user?.locationPreference || country,
        token: data.token,
      };

      savePendingAuth(pendingUser);
      navigate("/verify-otp", { state: pendingUser });
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canContinue = email.trim() && password.trim() && country && !isSubmitting;

  return (
    <AuthShell>
      <form onSubmit={handleSubmit}>
        <section className="px-5 py-7 bg-white rounded-t-lg">
          <h1 className="text-center text-2xl font-bold text-[#050b1d]">
            Welcome back
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Enter your email to sign in to your account
          </p>

          <label className="mt-7 block text-sm font-semibold text-slate-500">
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
            className="mt-5 w-full rounded-xl bg-[rgb(0,150,199)] py-2.5 text-sm font-bold text-white transition hover:bg-[rgb(1,130,173)] disabled:cursor-not-allowed disabled:bg-slate-400" >
            {isSubmitting ? "Sending OTP..." : "Continue with Email"}
          </button>
        </section>

        <footer className="border-t-0 border-slate-100 px-5 py-6 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-[#071126] dark:bg-slate-800 dark:text-white">
            <span className="underline decoration-white">Sign up</span>
          </Link>
        </footer>
      </form>
    </AuthShell>
  );
}

export default Signin;