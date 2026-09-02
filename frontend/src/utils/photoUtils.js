/**
 * Safely extract the string image URL from any photo representation
 * @param {string|Object} photo
 * @returns {string} Image URL or empty string
 */
export function getPhotoUrl(photo) {
  if (!photo) return '';
  if (typeof photo === 'string') return photo;
  if (typeof photo === 'object' && photo.url) return photo.url;
  return '';
}

/**
 * Normalize an array of photos into an array of string URLs
 * @param {Array<string|Object>} photos
 * @returns {string[]}
 */
export function normalizePhotoUrls(photos) {
  if (!Array.isArray(photos)) return [];
  return photos.map(getPhotoUrl).filter(Boolean);
}

export default {
  getPhotoUrl,
  normalizePhotoUrls
};
