import Image from "next/image";

const items = Array.from({ length: 10 }, (_, index) => index);

export function ArmyMarquee() {
  return (
    <div className="army-marquee overflow-hidden whitespace-nowrap py-5 text-white">
      <div className="army-marquee-track flex items-center">
        {[...items, ...items].map((_, index) => (
          <div key={index} className="army-marquee-item flex items-center pr-8">
            <span className="mx-4 text-[1rem] font-bold uppercase tracking-[0.28em] text-[#cfb45f] md:text-[1.1rem]">
              Ogya Ntom Prayer Army
            </span>
            <Image
              src="/brand/ogya-ntom-prayer-logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
