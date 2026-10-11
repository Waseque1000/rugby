"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactValues>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof ContactValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Your message could not be sent. Please try again.");
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-blue-700" />
        <h2 className="mt-4 text-2xl font-bold text-slate-900">Message received</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-700">
          Your message has been saved for the editorial team.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-10"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-bold uppercase text-foreground">
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-bold uppercase text-foreground">
            Email address
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="jane@example.com"
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-bold uppercase text-foreground">
          Topic / subject
        </label>
        <select
          id="contact-subject"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          required
          className="w-full cursor-pointer rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select a topic...</option>
          <option value="data-correction">Data correction or source citation</option>
          <option value="missing-player">Add a missing USA Sevens player</option>
          <option value="media-inquiry">Media or press inquiry</option>
          <option value="sponsorship">Sponsorship or partnership</option>
          <option value="other">Other feedback</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-bold uppercase text-foreground">
          Message & source links
        </label>
        <textarea
          id="contact-message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Describe the player record or question, and include links to primary sources."
          className="w-full resize-y rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Submit message</span>
          </>
        )}
      </button>
    </form>
  );
}
