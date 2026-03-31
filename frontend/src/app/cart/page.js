"use client";
import { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '../../store/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useContext(CartContext);

  if (!cart || cartCount === 0) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
        <h1 style={{ marginBottom: '20px' }}>Your Cart is Empty</h1>
        <p style={{ color: '#888', marginBottom: '30px' }}>Looks like you haven&apos;t added any authentic Konaseema pickles yet!</p>
        <Link href="/shop" className="btn">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh' }}>
      <div className="container">
        <h1 className="section-title">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 lg:gap-10">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map((item, idx) => (
              <div key={`${item.product._id}-${idx}`} className="flex gap-3 sm:gap-5 p-3 sm:p-5 bg-white rounded-xl shadow-sm">
                <img src={item.product.image || '/images/1.png'} alt={item.product.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{item.product.name}</h3>
                      <p style={{ color: 'var(--color-secondary)' }}>₹{item.product.price || (item.product.variants && item.product.variants[0]?.price) || 0} / {item.weight}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product._id, item.weight)} 
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}
                    >&times;</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item.product._id, item.weight, item.quantity - 1)} style={{ padding: '5px 10px', background: '#f5f5f5' }}>-</button>
                      <span style={{ padding: '5px 15px' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product._id, item.weight, item.quantity + 1)} style={{ padding: '5px 10px', background: '#f5f5f5' }}>+</button>
                    </div>
                    <span style={{ fontWeight: 'bold' }}>₹{(item.product.price || (item.product.variants && item.product.variants[0]?.price) || 0) * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px' }}>
              <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Order Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#555' }}>
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{cartTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#555' }}>
                <span>Shipping</span>
                <span>{cartTotal > 999 ? 'Free' : '₹50'}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '2px dashed #eee', fontWeight: 'bold', fontSize: '1.2rem' }}>
                <span>Total</span>
                <span>₹{cartTotal + (cartTotal > 999 ? 0 : 50)}</span>
              </div>

              <Link href="/checkout" className="btn" style={{ width: '100%', marginTop: '30px', display: 'block' }}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
