"use client";

import { useState, type FormEvent } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { GoldButton } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border border-line bg-surface/50 px-4 py-3 text-sm text-cream placeholder:text-dim transition-colors focus:border-line-gold focus:outline-none";

const labelClass =
  "mb-2 block text-[0.6rem] uppercase tracking-[0.2em] text-muted";

const projectTypes = [
  "Website",
  "E-commerce",
  "AI / Robotics",
  "Collaboration",
  "Something else",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Please email me directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start border border-line-gold bg-surface/50 p-10">
        <span className="mb-5 flex h-11 w-11 items-center justify-center border border-line-gold text-gold-light">
          <FiCheck className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl font-semibold tracking-[0.06em] text-cream">
          Message sent
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thanks for reaching out. I will get back to you within a day or two.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-[0.65rem] uppercase tracking-[0.2em] text-gold-light transition-colors hover:text-gold"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className={labelClass}>
            What is it about
          </label>
          <select id="projectType" name="projectType" className={fieldClass}>
            <option value="">Select one</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget (optional)
          </label>
          <input
            id="budget"
            name="budget"
            placeholder="Rough range"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me what you are working on."
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <GoldButton type="submit" disabled={status === "sending"} className="disabled:opacity-60">
        {status === "sending" ? "Sending" : "Send message"}
        <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </GoldButton>
    </form>
  );
}
