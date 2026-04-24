import Image from "next/image";
import Link from "next/link";

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(201,172,95,0.5),0_12px_28px_rgba(10,28,19,0.12)]">
        <Image
          src="/brand/ogya-ntom-prayer-logo.png"
          alt="Ogya Ntom Prayer Army logo"
          width={64}
          height={44}
          priority
          className="h-10 w-auto object-contain"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-lg font-bold leading-tight text-current">
          Ogya Ntom Prayer Army
        </span>
        {!compact && (
          <span className="block truncate text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
            Community of prayer warriors
          </span>
        )}
      </span>
    </Link>
  );
}
