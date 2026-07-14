import React from "react";

function AuthShell({ children }) {
  return (
    <main className="min-h-screen bg-[#f3f8fc] px-4 pt-28 pb-10 text-black dark:bg-slate-950 dark:text-white">
      <div className="mx-auto w-full max-w-[410px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {children}
      </div>
    </main>
  );
}

export default AuthShell;