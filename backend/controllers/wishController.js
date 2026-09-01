import Wish from '../models/Wish.js';
import { generateProjectId } from '../utils/idGenerator.js';
import { getIsConnected } from '../config/db.js';

// Development in-memory fallback store when running without MongoDB connection
const devMemoryStore = new Map();

/**
 * POST /api/wishes
 * Create a new customized wish
 */
export const createWish = async (req, res) => {
  try {
    const { occasion, templateId, recipientName, senderName, message, photos, customData } = req.body;

    // Validation
    if (!occasion || !occasion.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Occasion is required'
      });
    }

    if (!templateId || !templateId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Template ID is required'
      });
    }

    if (!recipientName || !recipientName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Recipient name is required'
      });
    }

    // Generate unique project ID
    let projectId = generateProjectId(7);

    const wishData = {
      projectId,
      occasion: occasion.trim(),
      templateId: templateId.trim(),
      recipientName: recipientName.trim(),
      senderName: senderName ? senderName.trim() : '',
      message: message ? message.trim() : '',
      photos: Array.isArray(photos) ? photos : [],
      customData: customData && typeof customData === 'object' ? customData : {},
      createdAt: new Date().toISOString()
    };

    // Save to MongoDB if connected
    if (getIsConnected()) {
      // Ensure unique collision safety
      let exists = await Wish.findOne({ projectId });
      while (exists) {
        projectId = generateProjectId(8);
        wishData.projectId = projectId;
        exists = await Wish.findOne({ projectId });
      }

      await Wish.create(wishData);
    }

    // Always mirror to dev memory store for instant local reliability
    devMemoryStore.set(projectId, wishData);

    return res.status(201).json({
      success: true,
      projectId
    });
  } catch (error) {
    console.error('Error in createWish:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create wish',
      error: error.message
    });
  }
};

/**
 * GET /api/wishes/:projectId
 * Retrieve a personalized wish by its unique project ID
 */
export const getWishByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId || !projectId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required'
      });
    }

    let wish = null;

    // Query MongoDB if connected
    if (getIsConnected()) {
      const doc = await Wish.findOne({ projectId: projectId.trim() });
      if (doc) {
        wish = doc.toJSON();
      }
    }

    // Fallback to dev memory store
    if (!wish) {
      wish = devMemoryStore.get(projectId.trim()) || null;
    }

    if (!wish) {
      return res.status(404).json({
        success: false,
        message: 'Wish not found'
      });
    }

    return res.status(200).json({
      success: true,
      wish
    });
  } catch (error) {
    console.error('Error in getWishByProjectId:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve wish',
      error: error.message
    });
  }
};
