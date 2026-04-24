import Image from "next/image";
import Link from "next/link";

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3">
      <span
        className={
          "flex shrink-0 items-center justify-center border border-[rgba(201,172,95,0.45)] bg-white shadow-[0_10px_24px_rgba(10,28,19,0.06)] " +
          (compact ? "h-9 w-9" : "h-10 w-10 sm:h-12 sm:w-12")
        }
      >
        <Image
          src="/brand/ogya-ntom-prayer-logo.png"
          alt="Ogya Ntom Prayer Army logo"
          width={64}
          height={44}
          priority
          className={("w-auto object-contain " + (compact ? "h-6" : "h-7 sm:h-8"))}
        />
      </span>
      <span className="min-w-0 max-w-[10.75rem] sm:max-w-none">
        <span
          className={
            "block truncate font-bold leading-tight text-current " +
            (compact ? "text-sm" : "text-[0.92rem] sm:text-lg")
          }
        >
          Ogya Ntom Prayer Army
        </span>
        {!compact && (
          <span className="hidden truncate text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--gold)] sm:block sm:text-xs">
            Prayer here, Prayer there.
          </span>
        )}
      </span>
    </Link>
  );
}
