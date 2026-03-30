"use client";
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../store/CartContext';

export default function Header() {
  const { cartCount } = useContext(CartContext);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '2rem' }}>🏺</span>
          <img src="/images/heritage-5.png" alt="" style={{ width: '40px', filter: 'brightness(var(--color-primary))' }} />
          <div>
            <span style={{ color: '#ffffff', display: 'block', fontSize: '1.4rem', fontWeight: 'bold' }}>Vip Vazraa</span>
            <span style={{ color: '#ffffff', display: 'block', fontSize: '1.1rem', marginTop: '-5px' }}>Pickles</span>
          </div>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="cart-icon">
            <Link href="/cart">
              🛒 {mounted && cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu" style={{ padding: '20px', background: 'var(--color-surface)', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
