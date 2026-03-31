import Link from 'next/link';

export const metadata = { title: 'About Us - Konaseema Pickles' };

export default function AboutPage() {
  return (
    <div style={{ padding: '60px 0', minHeight: '80vh', backgroundColor: 'var(--color-background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="section-title">Our Story</h1>
        
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', lineHeight: '1.8', fontSize: '1.1rem', color: '#444' }}>
          <p style={{ marginBottom: '20px' }}>
            Born in the heart of Konaseema, our pickles carry the legacy of generations. 
            For decades, our grandmothers perfected the art of pickling — using the freshest local ingredients, 
            hand-pounded spices, and the abundant sunshine of Andhra Pradesh.
          </p>
          
          <img 
            src="/images/heritage-3.png" 
            alt="Konaseema Landscape" 
            style={{ width: '100%', borderRadius: '12px', marginBottom: '30px' }}
          />

          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '15px' }}>Our Mission</h2>
          <p style={{ marginBottom: '20px' }}>
            We started Pickles Konaseema to bring these authentic, nostalgic flavors to everyone. 
            Every jar we pack is made with the same love, care, and uncompromising quality that we grew up with.
            No artificial preservatives, no shortcuts — just pure, fiery, and tangy goodness.
          </p>

          <p>
            Whether it&apos;s the iconic Avakaya, the fiery Gongura, or our special Non-Veg selections, 
            we guarantee an authentic taste experience that will transport you straight to the Godavari riverbanks.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/shop" className="btn">Explore Our Pickles</Link>
        </div>
      </div>
    </div>
  );
}
