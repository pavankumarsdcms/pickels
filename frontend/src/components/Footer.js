import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title" style={{ color: '#ffffff' }}>Vip Vazraa Pickles</h3>
            <p style={{ color: '#888', marginBottom: '15px' }}>
              Authentic, homemade pickles straight from our kitchen to your table. Bringing tradition to your home.
            </p>
          </div>
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop All Pickles</Link></li>
              <li><Link href="/about">Our Story</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-links">
              <li style={{ color: '#888' }}>📧 hello@revathipickles.com</li>
              <li style={{ color: '#888' }}>📞 +91 98765 43210</li>
              <li style={{ color: '#888' }}>📍 Rajahmundry, Andhra Pradesh</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vip Vazraa Pickles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
