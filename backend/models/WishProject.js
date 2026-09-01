// WishProject Data Schema Definition (MongoDB Mongoose ready for future step)
export const WishProjectSchema = {
  projectId: { type: String, required: true, unique: true },
  occasion: { 
    type: String, 
    required: true,
    enum: ['birthday', 'anniversary', 'graduation', 'farewell', 'valentines', 'congratulations', 'just-because']
  },
  templateId: { type: String, required: true },
  recipientName: { type: String, required: true },
  senderName: { type: String, default: '' },
  message: { type: String, default: '' },
  photos: [{ type: String }],
  customData: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
};

export default WishProjectSchema;
