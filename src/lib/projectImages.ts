/**
 *
 * Image helpers for projects. The data model prefers a `images: string[]`
 * field; older entries may still carry a single `image` (and optional
 * `hoverImage`) and the helpers below normalize them on read.
 */

export function getProjectImages(input: {
  images?: string[];
  image?: string;
  hoverImage?: string;
}): string[] {
  if (Array.isArray(input.images) && input.images.length > 0) {
    // De-duplicate while preserving order.
    return Array.from(new Set(input.images.filter(Boolean)));
  }
  const fallback: string[] = [];
  if (input.image) fallback.push(input.image);
  if (input.hoverImage) fallback.push(input.hoverImage);
  return Array.from(new Set(fallback.filter(Boolean)));
}

export function getCoverImage(input: {
  images?: string[];
  image?: string;
  hoverImage?: string;
}): string {
  const all = getProjectImages(input);
  return all[0] ?? "/placeholder.svg";
}
