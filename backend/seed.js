// No fetch import needed for Node 20+

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
  console.log('--- Starting Database Seed ---');
  for (const product of products) {
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, stock: 100 })
      });
      if (res.ok) {
        console.log(`✅ Seeded: ${product.name}`);
      } else {
        const err = await res.json();
        console.error(`❌ Failed: ${product.name} - ${err.error || err.message}`);
      }
    } catch (err) {
      console.error(`❌ Connection Error for ${product.name}: ${err.message}`);
    }
  }
}

seed();
