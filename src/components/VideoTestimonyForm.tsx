"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, PlayCircle } from "@phosphor-icons/react";

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

export function VideoTestimonyForm() {
  const [state, setState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const confirmationTitleId = useId();
  const videoHelpId = useId();
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
    setState({ status: "submitting", message: "Sending your video testimony..." });

    try {
      const response = await fetch("/api/testimonies", {
        method: "POST",
        body: formData,
      });
      let result: { message?: string } = {};

      try {
        result = (await response.json()) as { message?: string };
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(result.message || "Could not submit video testimony.");
      }

      form.reset();
      setState({
        status: "success",
        message: result.message || "Thank you. Your video testimony has been received.",
      });
      setIsConfirmationOpen(true);
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Could not submit video testimony.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="testimony-form video-testimony-form">
      <input type="hidden" name="submissionKind" value="video" />
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
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+233 24 000 0000..." />
        </label>
        <label className="testimony-field">
          <span>Short highlight</span>
          <input name="highlight" type="text" maxLength={80} placeholder="Healing, restoration..." />
        </label>
      </div>

      <label className="testimony-field">
        <span>Video testimony title</span>
        <input name="title" type="text" required maxLength={120} placeholder="What did God do?" />
      </label>

      <label className="testimony-video-field">
        <span>
          <PlayCircle size={18} weight="bold" aria-hidden="true" />
          Video testimony link
        </span>
        <p id={videoHelpId}>
          Paste the public TikTok, YouTube, Instagram, Facebook, Vimeo, or social video link.
        </p>
        <input
          name="videoTestimonyUrl"
          type="url"
          required
          maxLength={500}
          autoComplete="url"
          aria-describedby={videoHelpId}
          placeholder="https://www.tiktok.com/@name/video/..."
        />
      </label>

      <label className="testimony-field">
        <span>Short context</span>
        <textarea
          name="content"
          required
          rows={5}
          maxLength={1400}
          placeholder="Briefly tell us what the video testimony is about."
        />
      </label>

      <div className="testimony-form-footer">
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={state.status === "submitting"}
          className="testimony-submit-button"
        >
          {state.status === "submitting" ? "Sending video..." : "Submit Video Testimony"}
          <ArrowRight size={20} weight="bold" />
        </button>
      </div>

      {state.message ? <p className="sr-only" aria-live="polite">{state.message}</p> : null}

      {state.status === "error" && state.message ? (
        <p aria-live="polite" className="testimony-form-message testimony-form-message-error">
          {state.message}
        </p>
      ) : null}

      {isConfirmationOpen && typeof document !== "undefined"
        ? createPortal(
            <div className="prayer-request-success-layer" role="presentation">
              <button
                type="button"
                className="prayer-request-success-backdrop"
                onClick={closeConfirmation}
                aria-label="Close video testimony confirmation"
              />
              <section
                className="prayer-request-success-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${confirmationTitleId}-title`}
                aria-describedby={`${confirmationTitleId}-description`}
              >
                <p className="prayer-request-success-kicker">Video Testimony Received</p>
                <h2 id={`${confirmationTitleId}-title`}>Thank you for sharing your video testimony.</h2>
                <p id={`${confirmationTitleId}-description`}>
                  Your video link has been received and will be reviewed with care before it appears
                  publicly.
                </p>
                <p>
                  Once approved, the testimony can appear with a preview and open in the browser or
                  original platform.
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
            </div>,
            document.body,
          )
        : null}
    </form>
  );
}
