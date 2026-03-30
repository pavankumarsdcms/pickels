const mongoose = require('mongoose');

// Define Schema for seeding since we can't easily import from models
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  weight: String,
  image: String,
  description: String,
  stock: { type: Number, default: 100 }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const products = [
  { name: 'Spicy Gongura Pickle', category: 'veg', price: 250, weight: '250g', image: '/images/32.png', description: 'Authentic Andhra style Gongura pickle made with fresh leaves, perfectly spiced.' },
  { name: 'Traditional Avakaya', category: 'veg', price: 280, weight: '250g', image: '/images/20.png', description: 'The king of pickles. Sun-dried raw mangoes marinated in mustard powder and sesame oil.' },
  { name: 'Godavari Chicken Pickle', category: 'non-veg', price: 450, weight: '250g', image: '/images/non-veg-pickle.png', description: 'Tender chicken pieces cooked in traditional spices to create an irresistible savory experience.' },
  { name: 'Prawns Pickle Special', category: 'non-veg', price: 550, weight: '250g', image: '/images/36.png', description: 'Freshly caught coastal prawns pickled with a special blend of spices.' },
  { name: 'Nuvvula Karam Podi', category: 'podis', price: 150, weight: '200g', image: '/images/nuvvula-karam.png', description: 'Roasted sesame seeds powder, perfect with hot rice and ghee.' },
  { name: 'Bellam Avakaya (Sweet Mango)', category: 'veg', price: 300, weight: '250g', image: '/images/bellam-avakaya.png', description: 'A sweet and sour version of the classic mango pickle, made with jaggery.' },
  { name: 'Garlic Avakaya', category: 'veg', price: 290, weight: '250g', image: '/images/33.png', description: 'A pungent and spicy variant of Avakaya with rich garlic cloves.' },
  { name: 'Tomato Pickle', category: 'veg', price: 220, weight: '250g', image: '/images/34.png', description: 'Tangy and spicy tomato pickle made with sun-dried tomatoes.' },
  { name: 'Ginger Pickle (Allam Pachadi)', category: 'veg', price: 240, weight: '250g', image: '/images/35.png', description: 'Perfect balance of sweet, spicy, and tangy ginger flavor.' },
  { name: 'Nellore Fish Pickle', category: 'non-veg', price: 580, weight: '250g', image: '/images/36.png', description: 'Premium fish pieces marinated in traditional Nellore style spices.' },
  { name: 'Mutton Pickle Special', category: 'non-veg', price: 750, weight: '250g', image: '/images/37.png', description: 'Juicy mutton pieces slow-cooked and pickled for a rich meaty burst.' },
  { name: 'Idly Karappodi', category: 'podis', price: 160, weight: '200g', image: '/images/21.png', description: 'Classic companion for Idly and Dosa with high-quality lentils.' },
  { name: 'Kandi Podi (Lentil Powder)', category: 'podis', price: 170, weight: '200g', image: '/images/23.png', description: 'Traditional roasted lentil powder, a staple in every Telugu household.' },
];

async function seed() {
  try {
    const MONGODB_URI = 'mongodb://127.0.0.1:27017/konaseema-pickles';
    await mongoose.connect(MONGODB_URI);
    console.log('--- Database Connected for Clean Seed ---');

    // Delete all current products
    await Product.deleteMany({});
    console.log('🗑️ Existing products wiped clean.');

    // Insert new products with the correct fields
    const count = await Product.insertMany(products.map(p => ({ ...p, stock: 100 })));
    console.log(`✅ Success! Seeded ${count.length} products with complete prices and stock.`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
