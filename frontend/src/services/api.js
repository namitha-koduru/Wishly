// Wishly Frontend API Service Layer

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const APP_BASE_URL = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173');

/**
 * Check backend API health status
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API health check error:', error);
    throw error;
  }
}

/**
 * Upload one or multiple images to Cloudinary via backend upload endpoint
 * @param {File[]} files - Array of File objects from input/dropzone
 * @param {string} [occasion='general'] - Occasion category for folder organization
 * @returns {Promise<{success: boolean, images: Array<{url: string, publicId: string, width: number, height: number}>}>}
 */
export async function uploadImages(files, occasion = 'general') {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    formData.append('occasion', occasion);

    const response = await fetch(`${API_BASE_URL}/uploads/images`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to upload images (${response.status})`);
    }

    return data;
  } catch (error) {
    console.error('API uploadImages error:', error);
    throw error;
  }
}

/**
 * Delete an uploaded image from Cloudinary
 * @param {string} publicId
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function deleteImage(publicId) {
  try {
    const response = await fetch(`${API_BASE_URL}/uploads/images/${encodeURIComponent(publicId)}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API deleteImage error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Save and create a new personalized wish on the backend
 * @param {Object} wishData
 * @param {string} wishData.occasion - e.g. "birthday"
 * @param {string} wishData.templateId - e.g. "birthday-memories"
 * @param {string} wishData.recipientName - e.g. "Ananya"
 * @param {string} [wishData.senderName] - e.g. "Namitha"
 * @param {string} [wishData.message] - Heartfelt message text
 * @param {Array<Object|string>} [wishData.photos] - Cloudinary photo objects or image URLs
 * @param {Object} [wishData.customData] - Template specific dynamic extra data
 * @returns {Promise<{success: boolean, projectId: string}>}
 */
export async function createWish(wishData) {
  try {
    const response = await fetch(`${API_BASE_URL}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wishData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to create wish (${response.status})`);
    }

    return data;
  } catch (error) {
    console.error('API createWish error:', error);
    throw error;
  }
}

/**
 * Fetch a personalized wish by its unique project ID
 * @param {string} projectId - Short unique public ID (e.g. "7xK29p")
 * @returns {Promise<{success: boolean, wish: Object}>}
 */
export async function getWish(projectId) {
  try {
    const response = await fetch(`${API_BASE_URL}/wishes/${encodeURIComponent(projectId)}`);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || `Wish not found (${response.status})`);
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API getWish error:', error);
    throw error;
  }
}

export default {
  checkHealth,
  uploadImages,
  deleteImage,
  createWish,
  getWish,
  APP_BASE_URL
};
