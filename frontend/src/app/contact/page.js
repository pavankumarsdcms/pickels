"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate email submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh', backgroundColor: 'var(--color-background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="section-title">Contact Us</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1.5fr)', gap: '40px' }}>
          
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--color-primary)' }}>Get in Touch</h2>
            <p style={{ color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
              Have a question about our pickles, a bulk order inquiry, or just want to say hello? 
              Reach out to us using the form or our contact details below.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '5px' }}>Email</strong>
              <a href="mailto:hello@pickleskonaseema.com" style={{ color: 'var(--color-secondary)' }}>hello@pickleskonaseema.com</a>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '5px' }}>Phone / WhatsApp</strong>
              <p style={{ color: '#555' }}>+91 98765 43210</p>
            </div>
            
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '5px' }}>Kitchen Address</strong>
              <p style={{ color: '#555' }}>12/A, River View Road, <br/> Rajahmundry, <br/> Andhra Pradesh - 533101</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '50px 0', color: '#4CAF50' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Message Sent!</h3>
                <p style={{ color: '#555' }}>Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn" style={{ marginTop: '20px' }}>Send Another</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Send a Message</h2>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message</label>
                  <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{...inputStyle, resize: 'vertical'}} />
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>Send Message</button>
              </>
            )}
          </form>

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
