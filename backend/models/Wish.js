import mongoose from 'mongoose';

const WishSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, 'Project ID is required'],
      unique: true,
      index: true,
      trim: true
    },
    occasion: {
      type: String,
      required: [true, 'Occasion is required'],
      trim: true
    },
    templateId: {
      type: String,
      required: [true, 'Template ID is required'],
      trim: true
    },
    recipientName: {
      type: String,
      required: [true, 'Recipient name is required'],
      trim: true,
      maxLength: [100, 'Recipient name cannot exceed 100 characters']
    },
    senderName: {
      type: String,
      default: '',
      trim: true,
      maxLength: [100, 'Sender name cannot exceed 100 characters']
    },
    message: {
      type: String,
      default: '',
      trim: true,
      maxLength: [5000, 'Message cannot exceed 5000 characters']
    },
    photos: {
      type: [String],
      default: []
    },
    customData: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Fallback in case Mongoose model is already compiled in dev watch
export const Wish = mongoose.models.Wish || mongoose.model('Wish', WishSchema);
export default Wish;
