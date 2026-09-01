import crypto from 'crypto';

// Characters pool for clean, friendly, readable public IDs
const ALPHABET = '23456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';

/**
 * Generate a short, collision-resistant unique project ID for shareable URLs
 * @param {number} length - Desired length of ID (default: 7)
 * @returns {string} Unique public ID (e.g. "7xK29p")
 */
export function generateProjectId(length = 7) {
  const bytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return result;
}

export default generateProjectId;
