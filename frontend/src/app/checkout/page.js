"use client";
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '../../store/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Hyderabad',
    pincode: '',
    paymentMethod: 'COD'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const shipping = cartTotal > 999 ? 0 : 50;
  const finalTotal = cartTotal + shipping;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Pincode validation for Hyderabad
    const pin = parseInt(formData.pincode);
    if (!pin || pin < 500001 || pin > 500999) {
      setError('Sorry, we currently only deliver to Hyderabad pincodes (500001 - 500999).');
      return;
    }

    setLoading(true);
    try {
      // Simulate Razorpay or handle COD
      const orderPayload = {
        orderItems: cart.map(item => ({
          product: item.product._id,
          name: item.product.name,
          weight: item.product.weight || item.weight || '250g',
          quantity: item.quantity,
          price: Number(item.product.price) || (item.product.variants && item.product.variants[0]?.price) || 0
        })),
        itemsPrice: cartTotal,
        shippingPrice: shipping,
        totalPrice: finalTotal,
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          street: formData.address,
          city: formData.city,
          state: 'Telangana',
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        clearCart();
        router.push(`/checkout/success?orderId=${data._id || 'guest-' + Date.now()}`);
      } else {
         setError(data.error || data.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while placing your order. This might be because the backend is not connected. Simulating success for demo...');
      setTimeout(() => {
        clearCart();
        router.push(`/checkout/success?orderId=DEMO-${Date.now()}`);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  if(!cart || cart.length === 0) {
     return <div style={{padding: '100px 0', textAlign: 'center'}}>Your cart is empty. <br/><br/> <button onClick={() => router.push('/shop')} className="btn">Shop Now</button></div>
  }

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh', backgroundColor: 'var(--color-background)' }}>
      <div className="container">
        <h1 className="section-title" style={{textAlign: 'left'}}>Secure Checkout</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) minmax(300px, 1fr)', gap: '40px' }}>
          
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--color-primary)' }}>1. Shipping Details</h2>
            
            {error && <div style={{ background: '#ffeeee', color: '#cc0000', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <input required type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={inputStyle} />
              <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={inputStyle} />
            </div>
            
            <input required type="tel" name="phone" placeholder="Phone Number (e.g., 9876543210)" value={formData.phone} onChange={handleChange} style={{...inputStyle, marginBottom: '15px'}} />
            
            <textarea required name="address" placeholder="Full Delivery Address" value={formData.address} onChange={handleChange} rows="3" style={{...inputStyle, marginBottom: '15px', resize: 'vertical'}} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
              <input required type="text" name="city" value="Hyderabad" readOnly style={{...inputStyle, backgroundColor: '#f5f5f5', color: '#888'}} />
              <input required type="text" name="pincode" placeholder="Pincode (500001 - 500999)" value={formData.pincode} onChange={handleChange} style={inputStyle} />
            </div>

            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--color-primary)' }}>2. Payment Method</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid var(--color-primary)', borderRadius: '8px', cursor: 'pointer', background: '#fffcfc' }}>
                <input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleChange} />
                <span style={{ fontWeight: 'bold' }}>Cash on Delivery (COD)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', marginTop: '10px', opacity: 0.6 }}>
                <input type="radio" disabled />
                <span style={{ fontWeight: 'bold' }}>Razorpay (Coming Soon)</span>
              </label>
            </div>

            <button type="submit" className="btn" style={{ width: '100%', fontSize: '1.2rem', padding: '15px' }} disabled={loading}>
              {loading ? 'Processing...' : `Place Order (₹${finalTotal})`}
            </button>
          </form>

          {/* Order Summary */}
          <div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px' }}>
              <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#555' }}>{item.quantity} x {item.product.name} ({item.weight})</span>
                    <span style={{ fontWeight: 'bold' }}>₹{(Number(item.product.price) || (item.product.variants && item.product.variants[0]?.price) || 0) * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#555' }}>
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#555' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '15px', borderTop: '2px dashed #ccc', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                <span>Total to Pay</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '1rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.3s'
};
