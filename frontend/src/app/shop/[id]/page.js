"use client";
import { useState, useEffect, useContext, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartContext } from '../../../store/CartContext';

const weightOptions = [
  { label: '250g', multiplier: 1 },
  { label: '500g', multiplier: 1.9 },
  { label: '1kg', multiplier: 3.5 },
];

const fallbackProducts = [
  { _id: '1', name: 'Spicy Gongura Pickle', category: 'veg', price: 250, weight: '250g', image: '/images/32.png', description: 'Authentic Andhra style Gongura pickle made with fresh leaves, perfectly spiced.' },
  { _id: '2', name: 'Traditional Avakaya', category: 'veg', price: 280, weight: '250g', image: '/images/20.png', description: 'The king of pickles. Sun-dried raw mangoes marinated in mustard powder and sesame oil.' },
  { _id: '3', name: 'Godavari Chicken Pickle', category: 'non-veg', price: 450, weight: '250g', image: '/images/non-veg-pickle.png', description: 'Tender chicken pieces cooked in traditional spices to create an irresistible savory experience.' },
  { _id: '4', name: 'Prawns Pickle Special', category: 'non-veg', price: 550, weight: '250g', image: '/images/36.png', description: 'Freshly caught coastal prawns pickled with a special blend of spices.' },
  { _id: '5', name: 'Nuvvula Karam Podi', category: 'podis', price: 150, weight: '200g', image: '/images/nuvvula-karam.png', description: 'Roasted sesame seeds powder, perfect with hot rice and ghee.' },
  { _id: '6', name: 'Bellam Avakaya (Sweet Mango)', category: 'veg', price: 300, weight: '250g', image: '/images/bellam-avakaya.png', description: 'A sweet and sour version of the classic mango pickle, made with jaggery.' },
  { _id: '7', name: 'Garlic Avakaya', category: 'veg', price: 290, weight: '250g', image: '/images/33.png', description: 'A pungent and spicy variant of Avakaya with rich garlic cloves.' },
  { _id: '8', name: 'Tomato Pickle', category: 'veg', price: 220, weight: '250g', image: '/images/34.png', description: 'Tangy and spicy tomato pickle made with sun-dried tomatoes.' },
  { _id: '9', name: 'Ginger Pickle (Allam Pachadi)', category: 'veg', price: 240, weight: '250g', image: '/images/35.png', description: 'Perfect balance of sweet, spicy, and tangy ginger flavor.' },
  { _id: '10', name: 'Nellore Fish Pickle', category: 'non-veg', price: 580, weight: '250g', image: '/images/36.png', description: 'Premium fish pieces marinated in traditional Nellore style spices.' },
  { _id: '11', name: 'Mutton Pickle Special', category: 'non-veg', price: 750, weight: '250g', image: '/images/37.png', description: 'Juicy mutton pieces slow-cooked and pickled for a rich meaty burst.' },
  { _id: '12', name: 'Idly Karappodi', category: 'podis', price: 160, weight: '200g', image: '/images/21.png', description: 'Classic companion for Idly and Dosa with high-quality lentils.' },
  { _id: '13', name: 'Kandi Podi (Lentil Powder)', category: 'podis', price: 170, weight: '200g', image: '/images/23.png', description: 'Traditional roasted lentil powder, a staple in every Telugu household.' },
];

export default function ProductDetail({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('250g');
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found in DB');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        // Find in fallback
        const fallback = fallbackProducts.find(p => p._id === id);
        if (fallback) {
          setProduct(fallback);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '100px 0', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ padding: '100px 0', textAlign: 'center' }}>Product not found. <Link href="/shop" style={{color: 'var(--color-primary)'}}>Back to Shop</Link></div>;

  const currentMultiplier = weightOptions.find(w => w.label === selectedWeight)?.multiplier || 1;
  const basePrice = product.price || (product.variants && product.variants[0]?.price) || 0;
  const currentPrice = Math.round(basePrice * currentMultiplier);

  const similarProducts = fallbackProducts.filter(p => p.category === product.category && p._id !== product._id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart({ ...product, price: currentPrice }, quantity, selectedWeight);
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh' }}>
      <div className="container">
        <Link href="/shop" style={{ color: '#888', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>
          &larr; Back to Shop
        </Link>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '50px', alignItems: 'flex-start' }}>
          
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', background: '#fff', width: '100%', aspectRatio: '1' }}>
            <Image src={product.image || '/images/32.png'} alt={product.name} fill style={{ objectFit: 'cover' }} />
          </div>

          <div style={{ padding: '20px 0' }}>
            <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>{product.category}</span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--color-text)' }}>{product.name}</h1>
            <p style={{ fontSize: '2rem', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '20px' }}>
              ₹{currentPrice}
            </p>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '30px', lineHeight: '1.8' }}>
              {product.description || 'Authentic Konaseema flavors delivered to your doorstep.'}
            </p>
            
            <div style={{ marginBottom: '30px' }}>
              <strong style={{ display: 'block', marginBottom: '10px' }}>Select Weight:</strong>
              <div style={{ display: 'flex', gap: '15px' }}>
                {weightOptions.map(option => (
                  <button 
                    key={option.label}
                    onClick={() => setSelectedWeight(option.label)}
                    style={{
                      padding: '10px 20px',
                      border: `2px solid ${selectedWeight === option.label ? 'var(--color-primary)' : '#ddd'}`,
                      background: selectedWeight === option.label ? '#fffcfc' : '#fff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: selectedWeight === option.label ? 'bold' : 'normal'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
              <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '10px 15px', background: '#f5f5f5', fontSize: '1.2rem' }}>-</button>
                <div style={{ padding: '10px 20px', fontSize: '1.2rem', minWidth: '50px', textAlign: 'center' }}>{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '10px 15px', background: '#f5f5f5', fontSize: '1.2rem' }}>+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn" style={{ width: '100%', fontSize: '1.2rem', padding: '15px' }}>
              Add to Cart - ₹{currentPrice * quantity}
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--color-primary)' }}>Customer Reviews</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
              <div style={{ color: '#f39c12', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
              <h4 style={{ marginBottom: '5px' }}>&quot;Absolutely Delicious!&quot;</h4>
              <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '10px' }}>&quot;The authentic taste of this pickle reminds me of my grandmother&apos;s recipe. Will definitely buy again!&quot;</p>
              <small style={{ color: '#888' }}>- Priya Reddy, Hyderabad</small>
            </div>
            
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
              <div style={{ color: '#f39c12', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
              <h4 style={{ marginBottom: '5px' }}>&quot;Perfect Spice Level&quot;</h4>
              <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '10px' }}>&quot;I&apos;ve tried many brands, but Konaseema captures the exact traditional Godavari spice. Highly recommended.&quot;</p>
              <small style={{ color: '#888' }}>- Karthik Sharma, Bangalore</small>
            </div>

            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
              <div style={{ color: '#f39c12', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
              <h4 style={{ marginBottom: '5px' }}>&quot;Great Packaging&quot;</h4>
              <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '10px' }}>&quot;Arrived quickly and the jar was sealed perfectly. The oil wasn&apos;t leaking at all. Tastes amazing with hot rice.&quot;</p>
              <small style={{ color: '#888' }}>- Swathi V., Chennai</small>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div style={{ marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>Similar Products You Might Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {similarProducts.map((simProd) => (
                <Link href={`/shop/${simProd._id}`} key={simProd._id} style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', textDecoration: 'none', color: 'inherit', background: '#fff' }}>
                  <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                    <Image src={simProd.image} alt={simProd.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>{simProd.category}</span>
                    <h3 style={{ fontSize: '1.2rem', margin: '5px 0' }}>{simProd.name}</h3>
                    <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>₹{simProd.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
