export const SITE_NAME = "Ogya Ntom Prayer Army";
export const SITE_SHORT_NAME = "Ogyantom Prayer";
export const SITE_ALT_NAMES = ["Ogyantom Prayer", "Ogya Ntom", "Ogya Ntom Prayer"] as const;
export const SITE_DOMAIN = "ogyantomprayer.works";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_LOGO_PATH = "/icon.png";
export const SITE_BRAND_LOGO_PATH = "/brand/ogya-ntom-prayer-logo.png";
export const SITE_OG_IMAGE_PATH = "/opengraph-image";

export const SITE_DESCRIPTION =
  "Ogya Ntom Prayer Army is an online prayer ministry led by Watchman Opanin Thomas, connecting people through prayer, testimony, formation, and practical compassion.";

export const SITE_KEYWORDS = [
  "Ogya Ntom Prayer Army",
  "Ogyantom Prayer",
  "Ogya Ntom",
  "Ogya Ntom Prayer",
  "Ogya Ntom Prayer Works",
  "Watchman Opanin Thomas",
  "Opanin Thomas prayer ministry",
  "Chief Prayer Warrior Opanin Thomas",
  "online prayer ministry",
  "online Christian prayer ministry",
  "online prayer community",
  "prayer request",
  "send prayer request online",
  "confidential prayer request",
  "prayer army",
  "Prayer Army Ghana",
  "Christian prayer community",
  "Christian intercession online",
  "Ghana prayer ministry",
  "Ghana Christian ministry",
  "African prayer ministry",
  "testimonies",
  "Christian testimonies",
  "answered prayer testimonies",
  "online intercession",
  "morning prayer watch",
  "evening prayer watch",
  "prayer watch",
  "intercessory prayer",
  "Bible prayer support",
  "Bible encouragement",
  "Christian devotional teaching",
  "Holy Spirit prayer ministry",
  "prayer warriors",
  "WhatsApp prayer group",
  "Telegram prayer community",
  "Google Meet prayer gathering",
  "Christian giving",
  "widows and orphans support",
  "faith formation",
  "spiritual covering",
  "pray with me online",
];

export const SITE_SOCIAL_PROFILES = [
  "https://www.tiktok.com/@opaninnie?_r=1&_t=ZS-95wZ5cjczd2",
  "https://www.facebook.com/share/1BFv2UEMJZ/",
] as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
