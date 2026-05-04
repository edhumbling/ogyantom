"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

export function TestimonyForm() {
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
    setState({ status: "submitting", message: "Sending your testimony…" });

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      title: formData.get("title"),
      highlight: formData.get("highlight"),
      content: formData.get("content"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/testimonies", {
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
        throw new Error(result.message || "Could not submit testimony.");
      }

      form.reset();
      setState({
        status: "success",
        message: result.message || "Thank you. Your testimony has been received.",
      });
      setIsConfirmationOpen(true);
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Could not submit testimony.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="testimony-form">
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
          <input name="name" type="text" required maxLength={90} autoComplete="name" placeholder="Your name" />
        </label>
        <label className="testimony-field">
          <span>Email</span>
          <input name="email" type="email" maxLength={140} autoComplete="email" placeholder="name@example.com" />
        </label>
      </div>

      <div className="testimony-form-grid">
        <label className="testimony-field">
          <span>Phone or WhatsApp</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+233 24 000 0000…" />
        </label>
        <label className="testimony-field">
          <span>Short highlight</span>
          <input name="highlight" type="text" maxLength={80} placeholder="Healing, provision…" />
        </label>
      </div>

      <label className="testimony-field">
        <span>Testimony title</span>
        <input name="title" type="text" required maxLength={120} placeholder="What did God do?" />
      </label>

      <label className="testimony-field">
        <span>Your testimony</span>
        <textarea
          name="content"
          required
          rows={7}
          maxLength={4000}
          placeholder="Share what God has done."
        />
      </label>

      <div className="testimony-form-footer">
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={state.status === "submitting"}
          className="testimony-submit-button"
        >
          {state.status === "submitting" ? "Sending testimony…" : "Submit Testimony"}
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
            aria-label="Close testimony confirmation"
          />
          <section
            className="prayer-request-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${confirmationTitleId}-title`}
            aria-describedby={`${confirmationTitleId}-description`}
          >
            <p className="prayer-request-success-kicker">Testimony Received</p>
            <h2 id={`${confirmationTitleId}-title`}>Thank you for sharing what God has done.</h2>
            <p id={`${confirmationTitleId}-description`}>
              Your testimony has been received and will be reviewed with gratitude and care by the
              ministry team.
            </p>
            <p>
              May your story strengthen the faith of others as we celebrate the goodness of God
              together.
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
