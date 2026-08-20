import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();

    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ active: true });
    const totalCategories = await Category.countDocuments();
    const activeCategories = await Category.countDocuments({ active: true });

    return NextResponse.json({
      totalProducts,
      activeProducts,
      totalCategories,
      activeCategories,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}