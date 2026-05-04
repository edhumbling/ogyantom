"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ShieldCheck } from "@phosphor-icons/react";

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const categories = [
  "Family",
  "Healing",
  "Deliverance",
  "Direction",
  "Provision",
  "Thanksgiving",
  "Other",
];

export function PrayerRequestForm() {
  const [state, setState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const confirmationTitleId = useId();
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmationButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isConfirmationOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    confirmationButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsConfirmationOpen(false);
        submitButtonRef.current?.focus();
      }

      if (event.key === "Tab") {
        event.preventDefault();
        confirmationButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isConfirmationOpen]);

  function closeConfirmation() {
    setIsConfirmationOpen(false);
    submitButtonRef.current?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsConfirmationOpen(false);
    setState({ status: "submitting", message: "Sending your prayer request…" });

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      category: formData.get("category"),
      request: formData.get("request"),
      urgency: formData.get("urgency"),
      contactPreference: formData.get("contactPreference"),
      confidential: formData.get("confidential") === "on",
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let result: { message?: string } = {};

      try {
        result = (await response.json()) as { message?: string };
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(result.message || "Could not submit prayer request.");
      }

      form.reset();
      setState({
        status: "success",
        message: result.message || "Your prayer request has been received.",
      });
      setIsConfirmationOpen(true);
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not submit prayer request.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="testimony-form prayer-request-form">
      <input
        className="hidden"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="testimony-form-grid">
        <label className="testimony-field">
          <span>Name</span>
          <input
            name="name"
            type="text"
            required
            maxLength={90}
            autoComplete="name"
            placeholder="Your name…"
          />
        </label>
        <label className="testimony-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            maxLength={140}
            autoComplete="email"
            spellCheck={false}
            placeholder="name@example.com"
          />
        </label>
      </div>

      <div className="testimony-form-grid">
        <label className="testimony-field">
          <span>Phone or WhatsApp</span>
          <input
            name="phone"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            placeholder="+233 24 000 0000…"
          />
        </label>
        <label className="testimony-field">
          <span>Prayer focus</span>
          <select name="category" defaultValue="Family">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="testimony-form-grid">
        <label className="testimony-field">
          <span>Urgency</span>
          <select name="urgency" defaultValue="normal">
            <option value="normal">Normal watch</option>
            <option value="urgent">Urgent attention</option>
          </select>
        </label>
        <label className="testimony-field">
          <span>Preferred contact</span>
          <select name="contactPreference" defaultValue="whatsapp">
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone call</option>
            <option value="email">Email</option>
            <option value="none">No follow-up needed</option>
          </select>
        </label>
      </div>

      <label className="testimony-field">
        <span>Prayer request</span>
        <textarea
          name="request"
          required
          rows={8}
          maxLength={4000}
          placeholder="Share what you would like Watchman Opanin Thomas to pray about…"
        />
      </label>

      <label className="prayer-confidential-check">
        <input name="confidential" type="checkbox" />
        <span>
          <ShieldCheck size={18} weight="bold" />
          Keep this request private for Watchman Opanin Thomas and the ministry team.
        </span>
      </label>

      <div className="testimony-form-footer">
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={state.status === "submitting"}
          className="testimony-submit-button"
        >
          {state.status === "submitting" ? "Sending prayer request…" : "Send Prayer Request"}
          <ArrowRight size={20} weight="bold" />
        </button>
      </div>

      {state.message ? <p className="sr-only" aria-live="polite">{state.message}</p> : null}

      {state.status === "error" && state.message ? (
        <p aria-live="polite" className="testimony-form-message testimony-form-message-error">
          {state.message}
        </p>
      ) : null}

      {isConfirmationOpen ? (
        <div className="prayer-request-success-layer" role="presentation">
          <button
            type="button"
            className="prayer-request-success-backdrop"
            onClick={closeConfirmation}
            aria-label="Close prayer request confirmation"
          />
          <section
            className="prayer-request-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${confirmationTitleId}-title`}
            aria-describedby={`${confirmationTitleId}-description`}
          >
            <p className="prayer-request-success-kicker">Prayer Request Received</p>
            <h2 id={`${confirmationTitleId}-title`}>Your prayer is worthy before the Lord.</h2>
            <p id={`${confirmationTitleId}-description`}>
              We have received your request, and it will be swiftly attended and brought before the
              Lord with care and faith.
            </p>
            <p>
              Take heart: the Lord sees you, values your prayer, and will answer with mercy,
              wisdom, and a way through this burden.
            </p>
            <div className="prayer-request-success-actions">
              <button
                ref={confirmationButtonRef}
                type="button"
                className="prayer-request-success-button"
                onClick={closeConfirmation}
              >
                Amen
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </form>
  );
}
