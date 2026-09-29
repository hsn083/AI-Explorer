import mongoose, { Schema, models, Model } from 'mongoose';

export interface ICategory {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  color?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'from-blue-500 to-purple-500',
    },
    active: {
      type: Boolean,
      required: [true, 'Active status is required'],
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from name if not provided
CategorySchema.pre('save', function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const Category: Model<ICategory> = models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;