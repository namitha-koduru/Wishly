// In-memory store fallback before MongoDB is connected in future steps
const memoryStore = new Map();

// Get wish project by unique ID
export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = memoryStore.get(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Wish project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve wish project',
      error: error.message
    });
  }
};

// Create a new wish project
export const createProject = async (req, res) => {
  try {
    const { occasion, templateId, recipientName, senderName, message, photos, customData } = req.body;
    
    // Generate a clean 6-8 character unique project ID
    const projectId = Math.random().toString(36).substring(2, 8);

    const newProject = {
      projectId,
      occasion,
      templateId,
      recipientName: recipientName || '',
      senderName: senderName || '',
      message: message || '',
      photos: photos || [],
      customData: customData || {},
      createdAt: new Date().toISOString()
    };

    memoryStore.set(projectId, newProject);

    res.status(201).json({
      success: true,
      message: 'Wish project created successfully',
      data: newProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create wish project',
      error: error.message
    });
  }
};
