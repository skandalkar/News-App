import React from "react";
import { Link, Navigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import { getAuthUser } from "./authStorage";
import { UserCircle, User, LogOut } from "lucide-react";
import { COUNTRY_OPTIONS } from "../../constants/countries";

function Account() {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const countryLabel =
    COUNTRY_OPTIONS.find((option) => option.value === (user.country || user.locationPreference))?.label || "India";

  return (
    <AuthShell>
      <section className="px-6 py-7 bg-white rounded-t-lg">
        <h1 className="text-center text-2xl font-bold text-[#050b1d]"> Account</h1>
        <p className="mt-2 text-center text-sm text-slate-500">Your Briefly profile</p>

        <div className="mt-7 space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Name</p>
            <p className="mt-1 font-semibold text-[#071126]">
              {user.fullName || user.name}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
            <p className="mt-1 font-semibold text-[#071126]">{user.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Location Preference</p>
            <p className="mt-1 font-semibold text-[#071126]">{countryLabel}</p>
          </div>
        </div>

        <Link
          to="/"
          className="mt-6 block w-full rounded-2xl bg-[rgb(0,150,199)] py-2.5 text-center text-sm font-bold text-white transition hover:bg-[rgb(1,130,173)]">Back to News
        </Link>
      </section>
    </AuthShell>
  );
}

export default Account;