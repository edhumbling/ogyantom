import Image from "next/image";

const items = Array.from({ length: 10 }, (_, index) => index);

export function ArmyMarquee() {
  return (
    <div className="army-marquee overflow-hidden whitespace-nowrap text-white">
      <div className="army-marquee-track flex items-center">
        {[...items, ...items].map((_, index) => (
          <div key={index} className="army-marquee-item">
            <span className="army-marquee-text">Ogya Ntom Prayer Army</span>
            <Image
              src="/brand/ogya-ntom-prayer-logo.png"
              alt=""
              width={40}
              height={40}
              className="army-marquee-logo object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
