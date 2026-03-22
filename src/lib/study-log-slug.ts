import slugify from "slugify";

function buildSlugSuffix(title: string) {
  const asciiSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  if (asciiSlug) {
    return asciiSlug;
  }

  const encoded = encodeURIComponent(title.trim()).replace(/%/g, "").toLowerCase();

  return encoded.slice(0, 48) || "entry";
}

export function buildStudyLogBaseSlug(date: string, title: string) {
  return `${date}-${buildSlugSuffix(title)}`;
}
