import Image from "next/image";

const items = Array.from({ length: 10 }, (_, index) => index);

export function ArmyMarquee() {
  return (
    <div className="army-marquee py-12 text-white overflow-hidden whitespace-nowrap">
      <div className="army-marquee-track flex items-center">
        {[...items, ...items].map((_, index) => (
          <div key={index} className="army-marquee-item flex items-center pr-8">
            <span className="text-[6rem] md:text-[10rem] lg:text-[14rem] tracking-normal font-calligraphy text-gold mx-4" style={{ fontFamily: "var(--font-great-vibes)" }}>
              Ogya Ntom Prayer Army
            </span>
            <Image
              src="/brand/ogya-ntom-prayer-logo.png"
              alt=""
              width={128}
              height={128}
              className="h-16 md:h-24 lg:h-32 w-auto rounded-full bg-white/10 object-contain p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
