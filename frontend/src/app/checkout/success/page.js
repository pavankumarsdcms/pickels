"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#4CAF50', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '30px' }}>
        ✓
      </div>
      <h1 style={{ marginBottom: '20px', fontSize: '2.5rem', color: 'var(--color-primary)' }}>Order Placed Successfully!</h1>
      <p style={{ color: '#555', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '20px' }}>
        Thank you for choosing Konaseema Pickles. We are getting your authentic homemade pickles ready for dispatch.
      </p>
      
      {orderId && (
        <div style={{ background: '#f5f5f5', padding: '15px 30px', borderRadius: '8px', border: '1px dashed #ccc', marginBottom: '40px', display: 'inline-block' }}>
          <span style={{ color: '#888', marginRight: '10px' }}>Order Number:</span>
          <strong style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>{orderId}</strong>
        </div>
      )}

      <div>
        <Link href="/shop" className="btn">Continue Shopping</Link>
      </div>
    </div>
  );
}
