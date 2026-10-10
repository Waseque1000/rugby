"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  className?: string;
  compact?: boolean;
}

export function NewsletterForm({ className = "", compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }

      setStatus("success");
      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {status === "success" ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-950/15 border border-blue-600/40 text-blue-800 dark:text-blue-300">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
          <div className="text-sm font-medium">
            You&apos;re in! You&apos;ll receive squad updates, Olympic roster news, and tournament recap insights.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className={`flex flex-col ${compact ? "sm:flex-row" : "sm:flex-row"} gap-2`}>
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-all placeholder:text-muted-foreground"
                aria-label="Email address for rugby newsletter"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 flex-shrink-0 cursor-pointer"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <span>Subscribe Free</span>
              )}
            </button>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="text-[11px] text-muted-foreground text-center">
            Zero spam. Unsubscribe anytime. Not affiliated with USA Rugby.
          </p>
        </form>
      )}
    </div>
  );
}
