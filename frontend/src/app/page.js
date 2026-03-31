"use client";
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../store/CartContext';
import Link from 'next/link';
import Image from 'next/image';

import ParallaxHero from '../components/ui/ParallaxHero';

export default function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 6)); // Show first 6 products as best sellers
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1, product.weight || '250g');
  };
  return (
    <div className="relative bg-[#fdfcf9]">
      <ParallaxHero />

      {/* Traditional Separator */}
      <div style={{ textAlign: 'center', margin: '-40px 0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto' }}>
          <Image
            src="/images/heritage-4.png"
            alt="Separator"
            fill
            sizes="100px"
            style={{ borderRadius: '50%', border: '5px solid var(--color-background)', boxShadow: 'var(--shadow-md)', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Categories Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Explore Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>

            <Link href="/shop?category=veg" className="category-card" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', position: 'relative', height: '300px' }}>
              <Image src="/images/veg.png" alt="Veg Pickles" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: 'white', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Veg Pickles</h3>
              </div>
            </Link>

            <Link href="/shop?category=non-veg" className="category-card" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', position: 'relative', height: '300px' }}>
              <Image src="/images/non-veg.png" alt="Non-Veg Pickles" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: 'white', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Non-Veg Pickles</h3>
              </div>
            </Link>

            <Link href="/shop?category=podis" className="category-card" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', position: 'relative', height: '300px' }}>
              <Image src="/images/podis.png" alt="Podis" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: 'white', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Traditional Podis</h3>
              </div>
            </Link>

            <Link href="/shop?category=sweets" className="category-card" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', position: 'relative', height: '300px' }}>
              <Image src="/images/sweets.png" alt="Sweets" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: 'white', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Authentic Sweets</h3>
              </div>
            </Link>

            <Link href="/shop?category=snacks" className="category-card" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', position: 'relative', height: '300px' }}>
              <Image src="/images/snacks.png" alt="Snacks" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: 'white', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Godavari Snacks</h3>
              </div>
            </Link>

            <Link href="/shop?category=specials" className="category-card" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', position: 'relative', height: '300px' }}>
              <Image src="/images/specials.png" alt="Specials" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: 'white', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Godavari Specials</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="section" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: '5%', top: '5%', width: '120px', height: '120px', opacity: 0.1, pointerEvents: 'none' }}>
          <Image src="/images/heritage-7.png" alt="Decoration" fill sizes="120px" style={{ objectFit: 'contain' }} />
        </div>
        <div className="container">
          <h2 className="section-title" style={{ fontFamily: 'serif' }}>Our Bestselling Traditions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>

            {loading ? (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }}>Loading best flavors...</div>
            ) : (
              products.map(product => (
                <div key={product._id} className="product-card">
                  <div className="product-img-wrap">
                    <Image src={product.image || '/images/32.png'} alt={product.name} fill sizes="(max-width: 768px) 100vw, 250px" style={{ objectFit: 'cover' }} className="product-img" />
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-price">₹{product.price} <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'normal' }}>/ {product.weight || '250g'}</span></p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn add-to-cart-btn"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}

          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/shop" className="btn btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: '#fff8ea', borderTop: '3px double #e8c488', borderBottom: '3px double #e8c488', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '-10%', top: '50%', transform: 'translateY(-50%)', height: '120%', width: '100%', opacity: 0.05, filter: 'grayscale(1)', pointerEvents: 'none' }}>
          <Image src="/images/heritage-3.png" alt="" fill sizes="100vw" style={{ objectFit: 'contain' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
              <Image src="/images/heritage-6.png" alt="Heritage Icon" fill sizes="120px" style={{ borderRadius: '50%', opacity: 0.9, objectFit: 'cover' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '25px', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '2.5rem' }}>The Authentic Konaseema Way</h2>
              <p style={{ marginBottom: '30px', fontSize: '1.2rem', fontStyle: 'italic', color: '#555', lineHeight: '1.8' }}>
                &quot;In the lush landscapes of Konaseema, every pickle starts with a story—of the sun, the soil, and a secret recipe passed down through generations.&quot;
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <img src="/images/heritage-5.png" alt="" style={{ width: '40px', marginTop: '5px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--color-text)' }}>Grown in Local Soil</strong>
                    <span style={{ color: '#666' }}>Sourcing only the freshest, organic produce from our own Konaseema orchards.</span>
                  </div>
                </li>
                <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <img src="/images/heritage-4.png" alt="" style={{ width: '40px', marginTop: '5px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--color-text)' }}>Natural Sun-Drying</strong>
                    <span style={{ color: '#666' }}>Patiently sun-dried to lock in the intense, natural flavors without chemicals.</span>
                  </div>
                </li>
                <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <img src="/images/heritage-7.png" alt="" style={{ width: '40px', marginTop: '5px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--color-text)' }}>Generational Blending</strong>
                    <span style={{ color: '#666' }}>Secrets spices hand-pounded exactly as our grandmothers did decades ago.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', border: '10px solid white' }}>
                <Image src="/images/vadiyalu.png" alt="Our Heritage" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--color-secondary)', color: 'white', padding: '20px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: 'var(--shadow-md)', zIndex: 2 }}>
                Est. 1985
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Separator Small Icon */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <div style={{ position: 'relative', width: '60px', height: '60px', margin: '0 auto', opacity: 0.5 }}>
          <Image src="/images/heritage-7.png" alt="" fill sizes="60px" style={{ objectFit: 'contain' }} />
        </div>
      </div>

      {/* Cinematic Heritage Section - PARALLAX VERSION */}
      <section className="section" style={{
        position: 'relative',
        padding: '160px 20px',
        color: 'white',
        textAlign: 'center',
        marginTop: '60px',
        overflow: 'hidden',
        background: '#000'
      }}>
        {/* Parallax Layer */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=2000"
            alt="Godavari Texture"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover',
              opacity: 0.3,
              filter: 'grayscale(100%) brightness(50%)'
            }}
          />
        </div>

        {/* Shadow Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: '30px', opacity: 0.8 }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto', position: 'relative' }}>
              <Image
                src="/images/heritage-5.png"
                alt=""
                fill
                sizes="80px"
                style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
              />
            </div>
          </div>
          <p style={{
            fontSize: '2.4rem',
            fontFamily: 'serif',
            fontStyle: 'italic',
            maxWidth: '1000px',
            margin: '0 auto 40px',
            lineHeight: '1.4',
            color: '#fff',
            textShadow: '0 4px 15px rgba(0,0,0,1)',
            letterSpacing: '-0.5px'
          }}>
            &quot;The Godavari flows with grace, and our pickles carry the fire and tang of its banks. Experience a culinary heritage that spans centuries.&quot;
          </p>
          <div style={{ width: '100px', height: '3px', background: 'var(--color-secondary)', margin: '0 auto 30px', boxShadow: '0 0 15px var(--color-secondary)' }}></div>
          <span style={{
            fontSize: '1.4rem',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            fontWeight: '900',
            color: 'var(--color-secondary)',
            textShadow: '0 4px 8px rgba(0,0,0,0.8)'
          }}>
            Legacy of Konaseema
          </span>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Happy Customers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <div style={{ color: '#f39c12', fontSize: '1.5rem', marginBottom: '15px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#555' }}>
                &quot;The Gongura pickle tastes exactly like how my grandmother used to make it. Absolute perfection!&quot;
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>- Ramesh K., Hyderabad</h4>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <div style={{ color: '#f39c12', fontSize: '1.5rem', marginBottom: '15px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#555' }}>
                &quot;I ordered the Chicken pickle and it&apos;s simply out of this world. Right balance of spice and flavor.&quot;
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>- Sneha M., Vizag</h4>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <div style={{ color: '#f39c12', fontSize: '1.5rem', marginBottom: '15px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#555' }}>
                &quot;Their Avakaya is the highlight of my meals now. Packaged beautifully and delivered fresh.&quot;
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>- Venkatesh D., Vijayawada</h4>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
