"use client";

import { useState, type FormEvent } from "react";
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ status: "submitting", message: "Sending your testimony..." });

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
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Could not submit testimony.");
      }

      form.reset();
      setState({
        status: "success",
        message: result.message || "Thank you. Your testimony has been received.",
      });
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
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+233..." />
        </label>
        <label className="testimony-field">
          <span>Short highlight</span>
          <input name="highlight" type="text" maxLength={80} placeholder="Healing, provision..." />
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
          type="submit"
          disabled={state.status === "submitting"}
          className="testimony-submit-button"
        >
          {state.status === "submitting" ? "Sending..." : "Submit testimony"}
          <ArrowRight size={20} weight="bold" />
        </button>
      </div>

      {state.message ? (
        <p
          className={
            "testimony-form-message " +
            (state.status === "success"
              ? "testimony-form-message-success"
              : "testimony-form-message-error")
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
