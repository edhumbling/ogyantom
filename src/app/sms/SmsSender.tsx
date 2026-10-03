"use client";

import { useEffect, useState } from "react";

const PASSCODE_STORAGE_KEY = "ogya-sms-key";

function normalizeNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^233\d{9}$/.test(digits)) return digits;
  if (/^0\d{9}$/.test(digits)) return `233${digits.slice(1)}`;
  return null;
}

function parseRecipients(raw: string): { valid: string[]; invalid: number } {
  const seen = new Set<string>();
  let invalid = 0;
  for (const entry of raw.split(/[\n,;]+/)) {
    const trimmed = entry.trim();
    if (!trimmed) continue;
    const normalized = normalizeNumber(trimmed);
    if (normalized) seen.add(normalized);
    else invalid += 1;
  }
  return { valid: [...seen], invalid };
}

function countSegments(message: string): number {
  if (message.length <= 160) return 1;
  return Math.ceil(message.length / 153);
}

const hasNonGsmChars = (message: string) => /[^\x00-\x7F]/.test(message);

type SendResult = {
  recipients: number;
  segments: number;
  estimatedCredits: number;
};

export default function SmsSender() {
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [message, setMessage] = useState("");
  const [recipientsRaw, setRecipientsRaw] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SendResult | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(PASSCODE_STORAGE_KEY);
    if (saved) {
      setPasscode(saved);
      setUnlocked(true);
    }
  }, []);

  const { valid: validNumbers, invalid: invalidCount } =
    parseRecipients(recipientsRaw);
  const segments = countSegments(message);
  const estimatedCredits = validNumbers.length * segments;

  const unlock = (event: React.FormEvent) => {
    event.preventDefault();
    if (!passcode.trim()) return;
    sessionStorage.setItem(PASSCODE_STORAGE_KEY, passcode.trim());
    setUnlocked(true);
    setError(null);
  };

  const loadBalance = async () => {
    setError(null);
    try {
      const res = await fetch(
        `/api/sms/balance?key=${encodeURIComponent(passcode)}`
      );
      const data = (await res.json()) as { balance?: unknown; message?: string };
      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(PASSCODE_STORAGE_KEY);
          setUnlocked(false);
          setPasscode("");
        }
        setError(data.message || "Could not load balance.");
        return;
      }
      setBalance(
        typeof data.balance === "object"
          ? JSON.stringify(data.balance)
          : String(data.balance ?? "—")
      );
    } catch {
      setError("Could not load balance. Check your connection.");
    }
  };

  const send = async () => {
    setError(null);
    setResult(null);
    if (!message.trim()) {
      setError("Write a message first.");
      return;
    }
    if (validNumbers.length === 0) {
      setError("Add at least one valid Ghana phone number.");
      return;
    }
    const confirmed = window.confirm(
      `Send to ${validNumbers.length} recipient${validNumbers.length === 1 ? "" : "s"}? Estimated cost: ${estimatedCredits} credit${estimatedCredits === 1 ? "" : "s"}.`
    );
    if (!confirmed) return;

    setSending(true);
    try {
      const res = await fetch("/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: passcode,
          message: message.trim(),
          recipients: recipientsRaw,
        }),
      });
      const data = (await res.json()) as SendResult & { message?: string };
      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(PASSCODE_STORAGE_KEY);
          setUnlocked(false);
          setPasscode("");
        }
        setError(data.message || "Send failed.");
        return;
      }
      setResult({
        recipients: data.recipients,
        segments: data.segments,
        estimatedCredits: data.estimatedCredits,
      });
      setMessage("");
    } catch {
      setError("Could not reach the server. Check your connection.");
    } finally {
      setSending(false);
    }
  };

  if (!unlocked) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
        <h1 className="font-display text-3xl font-bold text-[#0d3a27]">
          Bulk SMS Sender
        </h1>
        <p className="mt-2 text-sm text-[#07120d]/70">
          Enter the sender passcode to unlock the Ogya Ntom SMS panel.
        </p>
        <form onSubmit={unlock} className="mt-6">
          <label
            htmlFor="sms-passcode"
            className="text-sm font-semibold text-[#07120d]"
          >
            Passcode
          </label>
          <input
            id="sms-passcode"
            type="password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#07120d]/20 bg-white px-4 py-3 text-[#07120d] outline-none focus:border-[#0d3a27]"
            autoComplete="off"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-[#0d3a27] px-4 py-3 font-semibold text-white hover:bg-[#0d3a27]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3a27]"
          >
            Unlock
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#0d3a27]">
            Bulk SMS Sender
          </h1>
          <p className="mt-1 text-sm text-[#07120d]/70">
            Sends from the <span className="font-semibold">OGYA NTOM</span>{" "}
            sender ID via Arkesel.
          </p>
        </div>
        <button
          type="button"
          onClick={loadBalance}
          className="rounded-lg border border-[#0d3a27]/30 px-4 py-2 text-sm font-semibold text-[#0d3a27] hover:bg-[#0d3a27]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3a27]"
        >
          Check balance{balance ? `: ${balance}` : ""}
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-[#07120d]/10 bg-white p-6 shadow-sm">
        <label
          htmlFor="sms-message"
          className="text-sm font-semibold text-[#07120d]"
        >
          Message
        </label>
        <textarea
          id="sms-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          placeholder="Write your broadcast message…"
          className="mt-2 w-full rounded-lg border border-[#07120d]/20 px-4 py-3 text-[#07120d] outline-none focus:border-[#0d3a27]"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span
            className={
              message.length > 160
                ? "font-semibold text-[#6d1237]"
                : "text-[#07120d]/60"
            }
          >
            {message.length} / 160 characters · {segments} SMS segment
            {segments === 1 ? "" : "s"}
          </span>
          {hasNonGsmChars(message) ? (
            <span className="font-semibold text-[#6d1237]">
              Contains special characters — limit drops to 70 per SMS. Remove
              emojis to stay at 160.
            </span>
          ) : null}
        </div>

        <label
          htmlFor="sms-recipients"
          className="mt-6 block text-sm font-semibold text-[#07120d]"
        >
          Recipients
        </label>
        <textarea
          id="sms-recipients"
          value={recipientsRaw}
          onChange={(event) => setRecipientsRaw(event.target.value)}
          rows={5}
          placeholder={"0244123456\n0207654321\n…one number per line, or comma-separated"}
          className="mt-2 w-full rounded-lg border border-[#07120d]/20 px-4 py-3 font-mono text-sm text-[#07120d] outline-none focus:border-[#0d3a27]"
        />
        <p className="mt-2 text-xs text-[#07120d]/60">
          {validNumbers.length} valid number{validNumbers.length === 1 ? "" : "s"}
          {invalidCount > 0
            ? ` · ${invalidCount} entr${invalidCount === 1 ? "y" : "ies"} skipped (not a valid Ghana number)`
            : ""}
          {" · "}Estimated cost:{" "}
          <span className="font-semibold text-[#07120d]">
            {estimatedCredits} credit{estimatedCredits === 1 ? "" : "s"}
          </span>
        </p>

        {error ? (
          <p role="alert" className="mt-4 rounded-lg bg-[#6d1237]/10 px-4 py-3 text-sm font-semibold text-[#6d1237]">
            {error}
          </p>
        ) : null}
        {result ? (
          <p role="status" className="mt-4 rounded-lg bg-[#0d3a27]/10 px-4 py-3 text-sm font-semibold text-[#0d3a27]">
            Sent to {result.recipients} recipient{result.recipients === 1 ? "" : "s"} (
            {result.segments} segment{result.segments === 1 ? "" : "s"} each, ~
            {result.estimatedCredits} credits).
          </p>
        ) : null}

        <button
          type="button"
          onClick={send}
          disabled={sending || !message.trim() || validNumbers.length === 0}
          className="mt-6 w-full rounded-lg bg-[#0d3a27] px-4 py-3 font-semibold text-white hover:bg-[#0d3a27]/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3a27]"
        >
          {sending
            ? "Sending…"
            : `Send to ${validNumbers.length} recipient${validNumbers.length === 1 ? "" : "s"}`}
        </button>
        <p className="mt-3 text-center text-xs text-[#07120d]/50">
          You will be asked to confirm before anything goes out.
        </p>
      </div>
    </main>
  );
}
