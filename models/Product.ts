import mongoose, { Schema, models, Model } from 'mongoose';

export interface IProduct {
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  description: string;
  features: string[];
  benefits: string[];
  category: string;
  categoryId?: mongoose.Types.ObjectId;
  soldCount: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  featured: boolean;
  popular: boolean;
  badge?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative'],
    },
    duration: {
      type: String,
      required: [true, 'Product duration is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    soldCount: {
      type: Number,
      default: 0,
      min: [0, 'Sold count cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, 'Review count cannot be negative'],
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      trim: true,
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
ProductSchema.pre('save', function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const Product: Model<IProduct> = models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;