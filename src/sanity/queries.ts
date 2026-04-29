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
  mainImage,
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset->
    },
    _type == "videoFile" => {
      ...,
      asset->
    },
    _type == "audioFile" => {
      ...,
      asset->
    }
  }
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

export const philanthropyQuery = `*[_type == "philanthropy"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  beneficiary,
  location,
  donationValue,
  impact,
  image
}`;

export const eventBySlugQuery = `*[_type == "event" && slug.current == $slug][0] {
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
  image,
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset->
    },
    _type == "videoFile" => {
      ...,
      asset->
    },
    _type == "audioFile" => {
      ...,
      asset->
    }
  }
}`;

export const philanthropyBySlugQuery = `*[_type == "philanthropy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  beneficiary,
  location,
  donationValue,
  impact,
  image,
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset->
    },
    _type == "videoFile" => {
      ...,
      asset->
    },
    _type == "audioFile" => {
      ...,
      asset->
    }
  }
}`;

export const publishedTestimoniesQuery = `*[_type == "testimony" && reviewStatus == "published"] | order(coalesce(publishedAt, submittedAt) desc) {
  _id,
  title,
  highlight,
  name,
  content,
  publishedAt,
  submittedAt
}`;
