const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

const cats = [
  { name: 'Veg Pickles', slug: 'veg' },
  { name: 'Non-Veg Pickles', slug: 'non-veg' },
  { name: 'Podis', slug: 'podis' }
];

async function seed() {
  try {
    const MONGODB_URI = 'mongodb://127.0.0.1:27017/konaseema-pickles';
    await mongoose.connect(MONGODB_URI);
    
    for (const c of cats) {
       await Category.updateOne({ slug: c.slug }, { $set: c }, { upsert: true });
    }
    
    console.log('✅ Base categories seeded successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  }
}

seed();
