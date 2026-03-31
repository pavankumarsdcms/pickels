"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../../store/CartContext';

const fallbackProducts = [
  { _id: '1', name: 'Spicy Gongura Pickle', category: 'veg', price: 250, weight: '250g', image: '/images/32.png' },
  { _id: '2', name: 'Traditional Avakaya', category: 'veg', price: 280, weight: '250g', image: '/images/20.png' },
  { _id: '3', name: 'Godavari Chicken Pickle', category: 'non-veg', price: 450, weight: '250g', image: '/images/non-veg-pickle.png' },
  { _id: '4', name: 'Prawns Pickle Special', category: 'non-veg', price: 550, weight: '250g', image: '/images/36.png' },
  { _id: '5', name: 'Nuvvula Karam Podi', category: 'podis', price: 150, weight: '200g', image: '/images/nuvvula-karam.png' },
  { _id: '6', name: 'Bellam Avakaya (Sweet Mango)', category: 'veg', price: 300, weight: '250g', image: '/images/bellam-avakaya.png' },
  { _id: '7', name: 'Garlic Avakaya', category: 'veg', price: 290, weight: '250g', image: '/images/33.png' },
  { _id: '8', name: 'Tomato Pickle', category: 'veg', price: 220, weight: '250g', image: '/images/34.png' },
  { _id: '9', name: 'Ginger Pickle (Allam Pachadi)', category: 'veg', price: 240, weight: '250g', image: '/images/35.png' },
  { _id: '10', name: 'Nellore Fish Pickle', category: 'non-veg', price: 580, weight: '250g', image: '/images/36.png' },
  { _id: '11', name: 'Mutton Pickle Special', category: 'non-veg', price: 750, weight: '250g', image: '/images/37.png' },
  { _id: '12', name: 'Idly Karappodi', category: 'podis', price: 160, weight: '200g', image: '/images/21.png' },
  { _id: '13', name: 'Kandi Podi (Lentil Powder)', category: 'podis', price: 170, weight: '200g', image: '/images/23.png' },
];

export default function ShopPage() {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = (product) => {
    const price = product.price || (product.variants && product.variants[0]?.price) || 0;
    const weight = product.weight || (product.variants && product.variants[0]?.weight) || '250g';
    addToCart({ ...product, price }, 1, weight);
  };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    // Fetch products
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setProducts(data);
        else setProducts(fallbackProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setProducts(fallbackProducts);
        setLoading(false);
      });

    // Fetch categories
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories', err));
  }, []);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div style={{ padding: '60px 0', backgroundColor: 'var(--color-background)', minHeight: '80vh' }}>
      <div className="container">
        <h1 className="section-title">Our Pickles & Podis</h1>
        
        {/* Filters */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button className={`btn ${filter === 'all' ? '' : 'btn-secondary'}`} onClick={() => setFilter('all')}>All</button>
          {categories.length > 0 ? (
            categories.map(cat => (
              <button 
                key={cat._id} 
                className={`btn ${filter === cat.slug ? '' : 'btn-secondary'}`} 
                onClick={() => setFilter(cat.slug)}
              >
                {cat.name}
              </button>
            ))
          ) : (
            <>
              <button className={`btn ${filter === 'veg' ? '' : 'btn-secondary'}`} onClick={() => setFilter('veg')}>Veg Pickles</button>
              <button className={`btn ${filter === 'non-veg' ? '' : 'btn-secondary'}`} onClick={() => setFilter('non-veg')}>Non-Veg Pickles</button>
              <button className={`btn ${filter === 'podis' ? '' : 'btn-secondary'}`} onClick={() => setFilter('podis')}>Podis</button>
            </>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', fontSize: '1.2rem', padding: '100px 0' }}>Loading authentic flavors...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-img-wrap">
                   <Image 
                    src={product.image || '/images/32.png'} 
                    alt={product.name} 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="product-img" 
                   />
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">₹{product.price || (product.variants && product.variants[0]?.price) || 0} <span style={{fontSize: '0.9rem', color: '#888', fontWeight: 'normal'}}>/ {product.weight || (product.variants && product.variants[0]?.weight) || '250g'}</span></p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <Link href={`/shop/${product._id}`} className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', padding: '10px', fontSize: '0.9rem' }}>
                      View
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      className="btn" 
                      style={{ flex: 2, padding: '10px', fontSize: '0.9rem' }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
