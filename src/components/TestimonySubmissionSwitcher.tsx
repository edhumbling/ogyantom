"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { FileText, PlayCircle } from "@phosphor-icons/react";
import { TestimonyForm } from "@/components/TestimonyForm";
import { VideoTestimonyForm } from "@/components/VideoTestimonyForm";

type TestimonyMode = "written" | "video";

export function TestimonySubmissionSwitcher() {
  const [mode, setMode] = useState<TestimonyMode>("written");
  const writtenPanelId = useId();
  const videoPanelId = useId();
  const writtenTabRef = useRef<HTMLButtonElement | null>(null);
  const videoTabRef = useRef<HTMLButtonElement | null>(null);

  function selectMode(nextMode: TestimonyMode) {
    setMode(nextMode);
    requestAnimationFrame(() => {
      if (nextMode === "written") {
        writtenTabRef.current?.focus();
      } else {
        videoTabRef.current?.focus();
      }
    });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectMode(mode === "written" ? "video" : "written");
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectMode(mode === "written" ? "video" : "written");
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectMode("written");
    }

    if (event.key === "End") {
      event.preventDefault();
      selectMode("video");
    }
  }

  return (
    <div className="testimony-submission-switcher">
      <div
        className="testimony-mode-tabs"
        role="tablist"
        aria-label="Choose testimony type"
        onKeyDown={handleTabKeyDown}
      >
        <button
          ref={writtenTabRef}
          type="button"
          role="tab"
          aria-selected={mode === "written"}
          aria-controls={writtenPanelId}
          id={`${writtenPanelId}-tab`}
          tabIndex={mode === "written" ? 0 : -1}
          onClick={() => setMode("written")}
        >
          <FileText size={17} weight="bold" aria-hidden="true" />
          Written testimony
        </button>
        <button
          ref={videoTabRef}
          type="button"
          role="tab"
          aria-selected={mode === "video"}
          aria-controls={videoPanelId}
          id={`${videoPanelId}-tab`}
          tabIndex={mode === "video" ? 0 : -1}
          onClick={() => setMode("video")}
        >
          <PlayCircle size={18} weight="bold" aria-hidden="true" />
          Video testimony
        </button>
      </div>

      <div
        id={writtenPanelId}
        role="tabpanel"
        aria-labelledby={`${writtenPanelId}-tab`}
        hidden={mode !== "written"}
      >
        <TestimonyForm />
      </div>
      <div
        id={videoPanelId}
        role="tabpanel"
        aria-labelledby={`${videoPanelId}-tab`}
        hidden={mode !== "video"}
      >
        <VideoTestimonyForm />
      </div>
    </div>
  );
}
