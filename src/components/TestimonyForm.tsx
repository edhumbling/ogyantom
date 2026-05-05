"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowRight, ImageSquare, X } from "@phosphor-icons/react";

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

type SelectedPhoto = {
  id: string;
  file: File;
  previewUrl: string;
};

const acceptedPhotoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxPhotoBytes = 5 * 1024 * 1024;
const maxPhotoCount = 3;

export function TestimonyForm() {
  const [state, setState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });
  const [photoMessage, setPhotoMessage] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const confirmationTitleId = useId();
  const photoInputId = useId();
  const photoHelpId = useId();
  const photoMessageId = useId();
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmationButtonRef = useRef<HTMLButtonElement | null>(null);
  const selectedPhotosRef = useRef<SelectedPhoto[]>([]);

  useEffect(() => {
    selectedPhotosRef.current = selectedPhotos;
  }, [selectedPhotos]);

  useEffect(() => {
    return () => {
      selectedPhotosRef.current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, []);

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

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";

    if (files.length === 0) {
      return;
    }

    const nextPhotos: SelectedPhoto[] = [];
    let message = "";
    const availableSlots = maxPhotoCount - selectedPhotos.length;

    if (availableSlots <= 0) {
      setPhotoMessage("You can attach up to three testimony pictures.");
      return;
    }

    for (const file of files) {
      if (nextPhotos.length >= availableSlots) {
        message = "Only the first three testimony pictures were kept.";
        break;
      }

      if (!acceptedPhotoTypes.has(file.type)) {
        message = "Please use JPEG, PNG, or WebP testimony pictures.";
        continue;
      }

      if (file.size > maxPhotoBytes) {
        message = "Each testimony picture must be 5 MB or smaller.";
        continue;
      }

      nextPhotos.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    if (nextPhotos.length > 0) {
      setSelectedPhotos((currentPhotos) => [...currentPhotos, ...nextPhotos]);
    }

    setPhotoMessage(
      message ||
        `${selectedPhotos.length + nextPhotos.length} of ${maxPhotoCount} testimony picture slots selected.`,
    );
  }

  function removePhoto(photoId: string) {
    setSelectedPhotos((currentPhotos) => {
      const photo = currentPhotos.find((item) => item.id === photoId);
      if (photo) {
        URL.revokeObjectURL(photo.previewUrl);
      }
      const nextPhotos = currentPhotos.filter((item) => item.id !== photoId);
      setPhotoMessage(
        nextPhotos.length
          ? `${nextPhotos.length} of ${maxPhotoCount} testimony picture slots selected.`
          : "",
      );
      return nextPhotos;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsConfirmationOpen(false);
    setState({ status: "submitting", message: "Sending your testimony…" });

    formData.delete("testimonyImagesPicker");
    selectedPhotos.forEach((photo) => {
      formData.append("testimonyImages", photo.file, photo.file.name);
    });

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
        throw new Error(result.message || "Could not submit testimony.");
      }

      form.reset();
      selectedPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
      setSelectedPhotos([]);
      setPhotoMessage("");
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

      <div className="testimony-photo-field">
        <div className="testimony-photo-head">
          <div>
            <span>Testimony pictures</span>
            <p id={photoHelpId}>
              Optional. Add up to three JPEG, PNG, or WebP pictures connected to your testimony.
            </p>
          </div>
          <label
            className="testimony-photo-trigger"
            htmlFor={photoInputId}
            aria-disabled={selectedPhotos.length >= maxPhotoCount}
          >
            <ImageSquare size={18} weight="bold" aria-hidden="true" />
            Add pictures
          </label>
        </div>
        <input
          id={photoInputId}
          name="testimonyImagesPicker"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={selectedPhotos.length >= maxPhotoCount || state.status === "submitting"}
          aria-describedby={`${photoHelpId} ${photoMessage ? photoMessageId : ""}`.trim()}
          onChange={handlePhotoChange}
        />
        {selectedPhotos.length > 0 ? (
          <ul className="testimony-photo-preview-list" aria-label="Selected testimony pictures">
            {selectedPhotos.map((photo, index) => (
              <li key={photo.id}>
                <Image
                  src={photo.previewUrl}
                  alt={`Selected testimony picture ${index + 1}`}
                  width={180}
                  height={132}
                  unoptimized
                />
                <div>
                  <span>{photo.file.name}</span>
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    aria-label={`Remove ${photo.file.name}`}
                  >
                    <X size={14} weight="bold" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
        {photoMessage ? (
          <p id={photoMessageId} className="testimony-photo-message" aria-live="polite">
            {photoMessage}
          </p>
        ) : null}
      </div>

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

      {isConfirmationOpen && typeof document !== "undefined"
        ? createPortal(
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
            </div>,
            document.body,
          )
        : null}
    </form>
  );
}
