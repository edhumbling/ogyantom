export const SITE_NAME = "Ogya Ntom Prayer Army";
export const SITE_SHORT_NAME = "Ogyantom Prayer";
export const SITE_DOMAIN = "ogyantomprayer.works";
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const SITE_DESCRIPTION =
  "Ogya Ntom Prayer Army is an online prayer ministry led by Watchman Opanin Thomas, connecting people through prayer, testimony, formation, and practical compassion.";

export const SITE_KEYWORDS = [
  "Ogya Ntom Prayer Army",
  "Ogyantom Prayer",
  "Watchman Opanin Thomas",
  "online prayer ministry",
  "prayer request",
  "prayer army",
  "Christian prayer community",
  "Ghana prayer ministry",
  "testimonies",
  "online intercession",
];

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
