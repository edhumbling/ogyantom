import Image from "next/image";
import Link from "next/link";

type LogoMarkProps = {
  compact?: boolean;
  shortTitle?: boolean;
  showSlogan?: boolean;
};

export function LogoMark({
  compact = false,
  shortTitle = false,
  showSlogan = true,
}: LogoMarkProps) {
  return (
    <Link href="/" className="flex min-w-0 max-w-full items-center gap-2 sm:gap-3">
      <span className={"flex shrink-0 items-center justify-center " + (compact ? "h-8 w-8" : "h-9 w-9 sm:h-12 sm:w-12")}>
        <Image
          src="/brand/ogya-ntom-prayer-logo.png"
          alt="Ogya Ntom Prayer Army logo"
          width={64}
          height={44}
          priority
          className={"w-auto object-contain " + (compact ? "h-5" : "h-6 sm:h-8")}
        />
      </span>
      <span className="min-w-0 flex flex-col">
        <span
          className={
            "inline-block whitespace-nowrap font-extrabold leading-tight tracking-[-0.04em] text-current drop-shadow-[0_1px_0_rgba(3,6,4,0.22)] " +
            (compact
              ? "text-[0.8rem]"
              : shortTitle
                ? "text-[0.86rem] sm:text-lg"
                : "text-[0.78rem] sm:text-[0.95rem] lg:text-[1.05rem]")
          }
        >
          {shortTitle ? "Ogya Ntom" : "Ogya Ntom Prayer Army"}
        </span>
        {showSlogan && (
          <span className="hidden truncate text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--gold)] sm:block sm:text-xs">
            Fire here! Fire there!
          </span>
        )}
      </span>
    </Link>
  );
}
