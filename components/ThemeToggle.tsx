"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  /** PDF/인쇄 시 `dark`가 켜져 있으면 `dark:` 글자색이 밝은 색으로 남아 흰 배경에서 안 보임 → 인쇄 전에만 라이트로 전환 */
  useEffect(() => {
    const printState = { hadDark: false };
    const onBeforePrint = () => {
      printState.hadDark = document.documentElement.classList.contains("dark");
      if (printState.hadDark) document.documentElement.classList.remove("dark");
    };
    const onAfterPrint = () => {
      if (printState.hadDark) document.documentElement.classList.add("dark");
      printState.hadDark = false;
    };
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
    };
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    setDark(next);
  }, []);

  const isDark = dark === true;

  return (
    <button
      type="button"
      onClick={toggle}
      className="no-print inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={isDark ? "라이트 모드" : "다크 모드"}
    >
      {dark === null ? (
        <span className="h-5 w-5 animate-pulse rounded-full bg-slate-300 dark:bg-slate-600" />
      ) : isDark ? (
        <SunIcon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
      ) : (
        <MoonIcon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
      )}
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
