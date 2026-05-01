"use client";

import Image from "next/image";
import Link from "next/link";
import { flushSync } from "react-dom";
import {
  ArrowDown,
  ArrowUp,
  HandsPraying,
  Plus,
  Stop,
  X,
} from "@phosphor-icons/react";
import {
  type CSSProperties,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ViewportMetrics = {
  height: number;
  offsetTop: number;
};

const logo = "/brand/ogya-ntom-prayer-logo.png";
const welcomeSuggestions = [
  "Pray with me",
  "Prayer watch times",
  "Send a prayer request",
];
const maxInputLines = 5;
const maxTableRows = 12;
const qaFixtures: Message[] = [
  {
    id: "fixture-user-1",
    role: "user",
    content: "Show me watch times and links.",
  },
  {
    id: "fixture-assistant-1",
    role: "assistant",
    content:
      "| Watch | Time | Link |\n| --- | --- | --- |\n| Dawn | 4:30 AM | https://ogyantomprayer.works/prayer-watch |\n| Noon | 12:00 PM | https://ogyantomprayer.works/prayer-watch |\n| Night | 9:00 PM | https://ogyantomprayer.works/prayer-watch.\n\nPrayer request: https://ogyantomprayer.works/prayer-request#form",
  },
];

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function resizePrayerInput(textarea: HTMLTextAreaElement | null) {
  if (!textarea) {
    return;
  }

  const styles = window.getComputedStyle(textarea);
  const lineHeight = Number.parseFloat(styles.lineHeight) || 24;
  const paddingTop = Number.parseFloat(styles.paddingTop) || 0;
  const paddingBottom = Number.parseFloat(styles.paddingBottom) || 0;
  const maxHeight = lineHeight * maxInputLines + paddingTop + paddingBottom;

  textarea.style.height = "auto";
  const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
  textarea.style.height = `${nextHeight}px`;
  textarea.style.overflowY = textarea.scrollHeight > maxHeight + 1 ? "auto" : "hidden";
}

function renderInlineMarkdown(text: string) {
  const urlPattern = /(https?:\/\/[^\s)]+)/g;
  const emphasisPattern = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*[^*\s]\*)/g;
  const parts = text.split(urlPattern);

  const stripTrailingPunctuation = (url: string) => {
    const trailingChars = [".", ",", "!", "?", ":", ";", ")", "]", "}", "#"];
    let trimmed = url;
    let trailing = "";

    while (trimmed && trailingChars.includes(trimmed.slice(-1))) {
      trailing = `${trimmed.slice(-1)}${trailing}`;
      trimmed = trimmed.slice(0, -1);
    }

    return { url: trimmed, trailing };
  };

  return parts.map((part, partIndex) => {
    if (part.match(urlPattern)) {
      const { url, trailing } = stripTrailingPunctuation(part);

      if (!url) {
        return part;
      }

      return (
        <span key={`${part}-${partIndex}`}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="prayer-chat-inline-link"
          >
            {url}
          </a>
          {trailing}
        </span>
      );
    }

    return part.split(emphasisPattern).map((piece, pieceIndex) => {
      const isBold =
        (piece.startsWith("**") && piece.endsWith("**")) ||
        (piece.startsWith("__") && piece.endsWith("__"));
      const isEmphasis =
        piece.startsWith("*") &&
        piece.endsWith("*") &&
        !piece.startsWith("**");

      if (isBold || isEmphasis) {
        return (
          <strong key={`${partIndex}-${pieceIndex}`}>
            {piece.replace(/^(\*\*|__|\*)|(\*\*|__|\*)$/g, "")}
          </strong>
        );
      }

      return piece;
    });
  });
}

type MessageBlock =
  | { type: "text"; lines: string[] }
  | { type: "table"; lines: string[] };

function isTableSeparator(line: string) {
  return /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);
}

function parseMessageBlocks(content: string): MessageBlock[] {
  const lines = content.split("\n");
  const blocks: MessageBlock[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const nextLine = lines[index + 1];

    if (line.includes("|") && nextLine && isTableSeparator(nextLine)) {
      const tableLines: string[] = [line, nextLine];
      let rowIndex = index + 2;

      while (rowIndex < lines.length) {
        const rowLine = lines[rowIndex];

        if (!rowLine.trim() || !rowLine.includes("|")) {
          break;
        }

        tableLines.push(rowLine);
        rowIndex += 1;
      }

      blocks.push({ type: "table", lines: tableLines });
      index = rowIndex - 1;
      continue;
    }

    blocks.push({ type: "text", lines: [line] });
  }

  return blocks;
}

function splitTableRow(line: string) {
  let normalized = line.trim();

  if (normalized.startsWith("|")) {
    normalized = normalized.slice(1);
  }

  if (normalized.endsWith("|")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized.split("|").map((cell) => cell.trim());
}

function MessageContent({ content }: { content: string }) {
  const normalizeLine = (line: string) =>
    line.replace(/^\s*#{1,6}\s+/, "").replace(/^\s*[-*]\s+/, "• ");
  const blocks = parseMessageBlocks(content);

  return (
    <>
      {blocks.map((block, blockIndex) => {
        if (block.type === "table") {
          const headerCells = splitTableRow(block.lines[0]);
          const bodyLines = block.lines.slice(2).map(splitTableRow);
          const columnCount = headerCells.length;
          const hasValidColumns =
            columnCount > 1 && bodyLines.every((row) => row.length === columnCount);

          if (!hasValidColumns) {
            return block.lines.map((line, lineIndex) => {
              const normalizedLine = normalizeLine(line);
              return (
                <span key={`${line}-${blockIndex}-${lineIndex}`} className="block">
                  {normalizedLine ? renderInlineMarkdown(normalizedLine) : "\u00a0"}
                </span>
              );
            });
          }

          const trimmedRows = bodyLines.slice(0, maxTableRows);

          return (
            <div
              key={`table-${blockIndex}`}
              className="prayer-chat-table"
              role="region"
              aria-label="Response table"
            >
              <table>
                <thead>
                  <tr>
                    {headerCells.map((cell, cellIndex) => (
                      <th key={`header-${blockIndex}-${cellIndex}`} scope="col">
                        {cell ? renderInlineMarkdown(cell) : "\u00a0"}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trimmedRows.map((row, rowIndex) => (
                    <tr key={`row-${blockIndex}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`cell-${blockIndex}-${rowIndex}-${cellIndex}`}>
                          {cell ? renderInlineMarkdown(cell) : "\u00a0"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return block.lines.map((line, lineIndex) => {
          const normalizedLine = normalizeLine(line);
          return (
            <span key={`${line}-${blockIndex}-${lineIndex}`} className="block">
              {normalizedLine ? renderInlineMarkdown(normalizedLine) : "\u00a0"}
            </span>
          );
        });
      })}
    </>
  );
}

export function PrayerAssistant() {
  const inputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCollapsedBar, setShowCollapsedBar] = useState(true);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [viewportMetrics, setViewportMetrics] = useState<ViewportMetrics | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const pendingAssistantScrollIdRef = useRef<string | null>(null);

  useEffect(() => {
    const updateViewportMetrics = () => {
      const viewport = window.visualViewport;
      const nextMetrics = {
        height: Math.round(viewport?.height ?? window.innerHeight),
        offsetTop: Math.max(0, Math.round(viewport?.offsetTop ?? 0)),
      };

      setViewportMetrics((currentMetrics) => {
        if (
          currentMetrics?.height === nextMetrics.height &&
          currentMetrics.offsetTop === nextMetrics.offsetTop
        ) {
          return currentMetrics;
        }

        return nextMetrics;
      });
    };

    updateViewportMetrics();
    window.visualViewport?.addEventListener("resize", updateViewportMetrics);
    window.visualViewport?.addEventListener("scroll", updateViewportMetrics);
    window.addEventListener("resize", updateViewportMetrics);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateViewportMetrics);
      window.visualViewport?.removeEventListener("scroll", updateViewportMetrics);
      window.removeEventListener("resize", updateViewportMetrics);
    };
  }, []);

  const scrollMessagesToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior });
  }, []);

  const updateScrollBottomVisibility = useCallback(() => {
    const container = messagesRef.current;

    if (!container) {
      setShowScrollBottom(false);
      return;
    }

    const hasOverflow = container.scrollHeight > container.clientHeight + 24;
    const hasContentBelow =
      container.scrollTop + container.clientHeight < container.scrollHeight - 36;

    setShowScrollBottom(hasOverflow && hasContentBelow);
  }, []);

  const scrollMessageToStart = useCallback((messageId: string) => {
    const container = messagesRef.current;
    const message = container?.querySelector<HTMLElement>(
      `[data-message-id="${messageId}"]`,
    );

    if (!container || !message) {
      return false;
    }

    const containerRect = container.getBoundingClientRect();
    const messageRect = message.getBoundingClientRect();
    const nextTop = container.scrollTop + messageRect.top - containerRect.top - 10;

    container.scrollTo({ top: Math.max(0, nextTop), behavior: "auto" });

    return true;
  }, []);

  useEffect(() => {
    const pendingAssistantId = pendingAssistantScrollIdRef.current;

    if (!pendingAssistantId) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (scrollMessageToStart(pendingAssistantId)) {
        pendingAssistantScrollIdRef.current = null;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, scrollMessageToStart]);

  useEffect(() => {
    let frame = 0;

    if (!isOpen) {
      frame = window.requestAnimationFrame(() => setShowScrollBottom(false));
      return () => window.cancelAnimationFrame(frame);
    }

    const container = messagesRef.current;

    if (!container) {
      return;
    }

    const scheduleVisibilityUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateScrollBottomVisibility);
    };

    scheduleVisibilityUpdate();
    container.addEventListener("scroll", scheduleVisibilityUpdate, { passive: true });
    window.addEventListener("resize", scheduleVisibilityUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      container.removeEventListener("scroll", scheduleVisibilityUpdate);
      window.removeEventListener("resize", scheduleVisibilityUpdate);
    };
  }, [isOpen, isLoading, messages, updateScrollBottomVisibility]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    resizePrayerInput(inputRef.current);
  }, [input, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(
      () => inputRef.current?.focus({ preventScroll: true }),
      80,
    );

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const focusInput = useCallback(() => {
    const textarea = inputRef.current;

    if (!textarea) {
      return;
    }

    textarea.focus({ preventScroll: true });
    resizePrayerInput(textarea);
  }, []);

  const openChat = useCallback(() => {
    flushSync(() => setIsOpen(true));
    focusInput();
    window.requestAnimationFrame(focusInput);
    window.setTimeout(focusInput, 90);
  }, [focusInput]);

  const closeChat = useCallback(() => {
    inputRef.current?.blur();
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
    setMessages((currentMessages) => {
      const lastMessage = currentMessages[currentMessages.length - 1];

      if (lastMessage?.role !== "assistant" || lastMessage.content.trim()) {
        return currentMessages;
      }

      return currentMessages.map((message) =>
        message.id === lastMessage.id
          ? { ...message, content: "Response stopped." }
          : message,
      );
    });
  }, []);

  const startNewChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setInput("");
    setError("");
    setIsLoading(false);
    setShowScrollBottom(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "i") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape") {
        closeChat();
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeChat, isOpen]);

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "i") {
        event.preventDefault();
        openChat();
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [openChat]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let frame = 0;

    const updateVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const footer = document.querySelector("footer");

        if (!footer) {
          setShowCollapsedBar(true);
          return;
        }

        const rect = footer.getBoundingClientRect();
        const buffer = 180;
        setShowCollapsedBar(rect.top > window.innerHeight - buffer);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (process.env.NODE_ENV === "production") {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    if (params.get("chat_qa") !== "1") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsOpen(true);
      setMessages(qaFixtures);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const trimmedMessage = rawMessage.trim();

      if (!trimmedMessage || isLoading) {
        return;
      }

      setIsOpen(true);
      setError("");
      setInput("");

      const userMessage: Message = {
        id: createMessageId(),
        role: "user",
        content: trimmedMessage,
      };
      const assistantId = createMessageId();
      const nextMessages = [...messages, userMessage];

      pendingAssistantScrollIdRef.current = assistantId;
      setMessages([
        ...nextMessages,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(data?.error ?? "The prayer assistant could not respond.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";
        let streamBuffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          streamBuffer += decoder.decode(value, { stream: true });
          const lines = streamBuffer.split("\n");
          streamBuffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data:")) {
              continue;
            }

            const data = line.slice(5).trim();

            if (data === "[DONE]") {
              continue;
            }

            try {
              const parsed = JSON.parse(data) as { content?: string };

              if (parsed.content) {
                assistantContent += parsed.content;
                setMessages((currentMessages) =>
                  currentMessages.map((message) =>
                    message.id === assistantId
                      ? { ...message, content: assistantContent }
                      : message,
                  ),
                );
              }
            } catch {
              // Ignore malformed event fragments.
            }
          }
        }
      } catch (requestError) {
        if ((requestError as Error).name !== "AbortError") {
          const message =
            requestError instanceof Error
              ? requestError.message
              : "The prayer assistant is temporarily unavailable.";
          setError(message);
          setMessages((currentMessages) =>
            currentMessages.map((currentMessage) =>
              currentMessage.id === assistantId
                ? {
                    ...currentMessage,
                    content:
                      "I could not connect right now. You can still send a prayer request at https://ogyantomprayer.works/prayer-request or contact the ministry team.",
                  }
                : currentMessage,
            ),
          );
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading, messages],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) {
      stopStreaming();
      return;
    }

    if (!input.trim()) {
      openChat();
      return;
    }

    void sendMessage(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      (!event.shiftKey || event.metaKey || event.ctrlKey)
    ) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {!isOpen && showCollapsedBar && (
        <form
          className="prayer-chat-collapsed"
          onSubmit={handleSubmit}
          aria-label="Open Ogya Ntom prayer assistant"
        >
          <label className="sr-only" htmlFor={`${inputId}-collapsed`}>
            Ask Ogya Ntom Prayer Assistant
          </label>
          <Image
            src={logo}
            alt=""
            width={32}
            height={32}
            className="prayer-chat-collapsed-logo"
            priority
          />
          <textarea
            id={`${inputId}-collapsed`}
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onFocus={openChat}
            placeholder="Ask for prayer, Bible help, or ministry support…"
            name="collapsed-prayer-assistant-message"
            autoComplete="off"
          />
          <kbd aria-hidden="true">Ctrl I</kbd>
          <button type="submit" aria-label="Send message to prayer assistant">
            <ArrowUp size={18} weight="bold" aria-hidden="true" />
          </button>
        </form>
      )}

      <button
        ref={triggerRef}
        type="button"
        className={`prayer-chat-mobile-trigger ${isOpen ? "hidden" : ""}`}
        onClick={openChat}
        aria-label="Open Ogya Ntom prayer assistant"
      >
        <span className="prayer-chat-trigger-ring" aria-hidden="true" />
        <Image src={logo} alt="" width={52} height={52} priority />
      </button>

      {isOpen && (
        <div className="prayer-chat-layer" role="presentation">
          <button
            type="button"
            className="prayer-chat-backdrop"
            aria-label="Close prayer assistant"
            onClick={closeChat}
          />
          <section
            ref={panelRef}
            className="prayer-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${inputId}-title`}
            style={
              viewportMetrics
                ? ({
                    "--prayer-chat-vh": `${viewportMetrics.height}px`,
                    "--prayer-chat-top": `${viewportMetrics.offsetTop}px`,
                  } as CSSProperties)
                : undefined
            }
          >
            <header className="prayer-chat-header">
              <div className="prayer-chat-brand">
                <Image src={logo} alt="" width={44} height={44} priority />
                <div>
                  <h2 id={`${inputId}-title`}>Ogya Ntom Prayer Assistant</h2>
                  <p>Prayer, Scripture, ministry support</p>
                </div>
              </div>
              <div className="prayer-chat-header-actions">
                <button
                  type="button"
                  onClick={startNewChat}
                  aria-label="Start a new prayer assistant chat"
                  title="New chat"
                >
                  <Plus size={20} weight="bold" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={closeChat}
                  aria-label="Close prayer assistant"
                  title="Close"
                >
                  <X size={20} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="prayer-chat-stream" aria-hidden="true">
              <span />
            </div>

            <div
              ref={messagesRef}
              className="prayer-chat-messages"
              aria-live="polite"
              aria-busy={isLoading}
            >
              {!hasMessages && (
                <div className="prayer-chat-empty">
                  <Image src={logo} alt="" width={76} height={76} priority />
                  <p className="prayer-chat-kicker">Prayer support</p>
                  <h3>How can we pray?</h3>
                  <p>Ask for prayer, Scripture, watch times, or a ministry link.</p>
                  <div className="prayer-chat-suggestions" aria-label="Suggested prompts">
                    {welcomeSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => void sendMessage(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <article
                  key={message.id}
                  data-message-id={message.id}
                  className={`prayer-chat-message prayer-chat-message-${message.role}`}
                >
                  {message.role === "assistant" && (
                    <Image src={logo} alt="" width={32} height={32} />
                  )}
                  <div>
                    {message.content ? (
                      <MessageContent content={message.content} />
                    ) : (
                      <span className="prayer-chat-thinking">
                        <span />
                        <span />
                        <span />
                      </span>
                    )}
                    {isLoading && message.id === messages[messages.length - 1]?.id && (
                      <span className="prayer-chat-caret" aria-hidden="true" />
                    )}
                  </div>
                </article>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {error && (
              <p className="prayer-chat-error" role="status">
                {error}{" "}
                <Link href="/prayer-request">Send a prayer request</Link>
              </p>
            )}

            <div className="prayer-chat-composer-area">
              {showScrollBottom && (
                <button
                  type="button"
                  className="prayer-chat-scroll-bottom"
                  onClick={() => scrollMessagesToBottom()}
                  aria-label="Scroll prayer assistant conversation to the latest message"
                  title="Scroll to latest message"
                >
                  <span className="prayer-chat-scroll-icon" aria-hidden="true">
                    <ArrowDown size={18} weight="bold" aria-hidden="true" />
                  </span>
                </button>
              )}
              <form className="prayer-chat-composer" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor={inputId}>
                  Message Ogya Ntom Prayer Assistant
                </label>
                <textarea
                  ref={inputRef}
                  id={inputId}
                  rows={1}
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    resizePrayerInput(event.currentTarget);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Share what you need prayer or Bible help with…"
                  name="prayer-assistant-message"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!isLoading && !input.trim()}
                  className={`prayer-chat-send-button ${
                    isLoading ? "prayer-chat-send-button-stop" : ""
                  }`}
                  aria-label={isLoading ? "Stop prayer assistant response" : "Send message"}
                >
                  {isLoading ? (
                    <Stop size={18} weight="fill" aria-hidden="true" />
                  ) : (
                    <ArrowUp size={18} weight="bold" aria-hidden="true" />
                  )}
                  <span>{isLoading ? "Stop" : "Send"}</span>
                </button>
              </form>
            </div>

            <p className="prayer-chat-disclaimer">
              <HandsPraying size={14} weight="fill" aria-hidden="true" />
              For urgent danger or crisis, contact local emergency services and trusted people immediately.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
