export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  categories,
  mainImage
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  categories,
  body,
  mainImage
}`;

export const eventsQuery = `*[_type == "event"] | order(startDate asc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  startDate,
  endDate,
  location,
  platform,
  meetingLink,
  status,
  image
}`;
