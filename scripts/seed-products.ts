import connectDB from '../lib/mongodb';
import Product from '../models/Product';
import products from '../data/products.json';

async function seedProducts() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Delete all existing products first
    const deleteResult = await Product.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing products`);

    let created = 0;

    for (const product of products) {
      await Product.create({
        name: product.name,
        slug: product.slug,
        image: product.image || '',
        price: product.price,
        originalPrice: product.oldPrice || undefined,
        duration: product.duration,
        description: product.description,
        features: product.features || [],
        benefits: product.benefits || [],
        category: product.category,
        soldCount: product.sold || 0,
        featured: product.popular || false,
        popular: product.popular || false,
        badge: product.badge || undefined,
        active: true,
      });

      console.log(`Created product: ${product.name}`);
      created++;
    }

    console.log('\n=== Migration Summary ===');
    console.log(`Deleted: ${deleteResult.deletedCount}`);
    console.log(`Inserted: ${created}`);
    console.log(`Total products: ${products.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();