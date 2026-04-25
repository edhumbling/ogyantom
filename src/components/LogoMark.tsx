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
      <span className={"min-w-0 sm:max-w-none " + (shortTitle ? "max-w-[8rem]" : "max-w-[12rem]")}>
        <span
          className={
            "block truncate font-bold leading-tight text-current " +
            (compact ? "text-[0.82rem]" : "text-[0.88rem] sm:text-lg")
          }
        >
          {shortTitle ? (
            "Ogya Ntom"
          ) : (
            "Ogya Ntom Prayer Army"
          )}
        </span>
        {showSlogan && (
          <span className="hidden truncate text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--gold)] sm:block sm:text-xs">
            Prayer here, Prayer there
          </span>
        )}
      </span>
    </Link>
  );
}
