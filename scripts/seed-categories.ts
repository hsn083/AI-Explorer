import connectDB from '../lib/mongodb';
import Category from '../models/Category';
import categories from '../data/categories.json';

async function seedCategories() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const category of categories) {
      const existing = await Category.findOne({ name: category.name });

      if (existing) {
        console.log(`Category "${category.name}" already exists, skipping...`);
        skipped++;
        continue;
      }

      // Generate slug from name
      const slug = category.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      await Category.create({
        name: category.name,
        slug,
        description: category.description || '',
        image: category.image || '',
        color: category.color || 'from-blue-500 to-purple-500',
        active: true,
      });

      console.log(`Created category: ${category.name}`);
      created++;
    }

    console.log('\n=== Migration Summary ===');
    console.log(`Created: ${created}`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Total: ${categories.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();