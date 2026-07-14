import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import { clearPendingAuth, getPendingAuth, saveAuthUser } from "./authStorage";
import { resendOTP, verifyOTP } from "../../Services/AuthService";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

function VerifyOTP() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const pendingUser = state || getPendingAuth();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [showSentToast, setShowSentToast] = useState(true);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN_SECONDS);
  const inputsRef = useRef([]);

  const code = useMemo(() => otp.join(""), [otp]);
  const canResend = resendTimer === 0 && !isResending;
  const formattedTimer = useMemo(() => {
    const minutes = String(Math.floor(resendTimer / 60)).padStart(2, "0");
    const seconds = String(resendTimer % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [resendTimer]);

  useEffect(() => {
    if (!pendingUser?.email) return;

    inputsRef.current[0]?.focus();
  }, [pendingUser?.email]);

  useEffect(() => {
    if (!pendingUser?.email || !showSentToast) return undefined;

    const timer = setTimeout(() => setShowSentToast(false), 3500);
    return () => clearTimeout(timer);
  }, [pendingUser?.email, showSentToast]);

  useEffect(() => {
    if (resendTimer <= 0) return undefined;

    const timer = setInterval(() => {
      setResendTimer((currentTimer) => Math.max(currentTimer - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  if (!pendingUser?.email) {
    return <Navigate to="/signin" replace />;
  }

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (!pastedCode.length) return;

    const nextOtp = Array(OTP_LENGTH).fill("");
    pastedCode.forEach((digit, index) => {
      nextOtp[index] = digit;
    });
    setOtp(nextOtp);
    inputsRef.current[Math.min(pastedCode.length, OTP_LENGTH) - 1]?.focus();
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    if (code.length !== OTP_LENGTH) return;
    setError("");
    setIsVerifying(true);

    try {
      const { data } = await verifyOTP({ email: pendingUser.email, otp: code });

      saveAuthUser({
        ...pendingUser,
        token: data.token || pendingUser.token,
        verified: true,
        signedInAt: new Date().toISOString(),
      });
      clearPendingAuth();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async (event) => {
    event.preventDefault();

    if (!canResend) return;

    setError("");
    setIsResending(true);

    try {
      const { data } = await resendOTP({ email: pendingUser.email });
      const nextCooldown = data.resendAfter || RESEND_COOLDOWN_SECONDS;

      setOtp(Array(OTP_LENGTH).fill(""));
      setResendTimer(nextCooldown);
      setShowSentToast(true);
      inputsRef.current[0]?.focus();
    } catch (err) {
      const retryAfter = err.response?.data?.retryAfter;
      if (retryAfter) {
        setResendTimer(retryAfter);
      }
      setError(err.response?.data?.message || "Unable to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthShell>
      <form onSubmit={handleVerify} className="px-6 py-7 bg-white rounded-t-lg">
        {showSentToast && (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 shadow-sm">
            <CheckCircle2 className="h-4 w-4" />
            OTP sent to {pendingUser.email} successfully.
          </div>
        )}

        <h1 className="text-center text-2xl font-bold text-[#050b1d]">
          Check your email
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          We sent a 6-digit verification code to
        </p>
        <p className="mt-1 text-center text-sm font-bold text-[#050b1d]">
          {pendingUser.email}
        </p>

        <div className="mt-6 flex justify-center gap-2 text-sm font-semibold text-slate-500">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              inputMode="numeric"
              maxLength={1}
              className="mt-1 w-full border rounded text-center border-slate-300 bg-slate-50 px-3 py-2 font-normal text-slate-700 shadow-sm outline-none focus:border-[#c6cbdb]"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {error && (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {/* Timer of 1 Mins then Resend OTP button */}
        <div className="gap-2 mt-3 text-center text-sm text-[#071127] ">
          <p>{formattedTimer}</p>
          <button
            type="button"
            disabled={!canResend}
            onClick={resendCode}
            className="cursor-pointer underline hover:text-slate-700 hover:font-medium disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </div>

        <button
          type="submit"
          disabled={code.length !== OTP_LENGTH || isVerifying}
          className="mt-7 rounded-xl flex w-full items-center justify-center gap-3 bg-[rgb(0,150,199)] py-2.5 text-sm font-bold text-white transition hover:bg-[rgb(1,130,173)] disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </AuthShell>
  );
}

export default VerifyOTP;
