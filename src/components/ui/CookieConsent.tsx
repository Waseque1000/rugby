"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("usa_sevens_cookie_consent");
      if (!consent) {
        // Small delay so it appears smoothly without blocking initial paint
        const timer = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("usa_sevens_cookie_consent", "accepted");
    } catch {}
    setIsOpen(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("usa_sevens_cookie_consent", "declined");
    } catch {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl p-5 shadow-2xl text-foreground">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-950/15 text-blue-700 dark:text-blue-400 dark:bg-blue-900/30 flex-shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-sm text-foreground">Privacy & Cookie Preferences</h4>
              <button
                onClick={handleDecline}
                className="text-muted-foreground hover:text-foreground p-1 -mr-1 rounded-lg"
                aria-label="Dismiss cookie banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              We use essential and analytics cookies to optimize site performance, analyze audience traffic, and deliver a smooth rugby database experience. Read our{" "}
              <Link href="/privacy" className="text-blue-700 dark:text-blue-400 underline font-medium">
                Privacy Policy
              </Link>.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 inline-flex items-center justify-center py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium transition-all cursor-pointer"
              >
                Essential Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
