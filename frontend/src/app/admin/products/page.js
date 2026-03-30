"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Memoized Table Row for performance
const ProductRow = React.memo(({ product, onEdit, onToggleStock }) => (
  <tr style={{ borderBottom: '1px solid #eee' }}>
    <td style={{ padding: '15px' }}>
      <div style={{ width: '50px', height: '50px', position: 'relative', overflow: 'hidden', borderRadius: '4px', background: '#f5f5f5' }}>
        <img 
          src={product.image || '/images/1.png'} 
          alt={product.name} 
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    </td>
    <td style={{ padding: '15px', fontWeight: 'bold' }}>{product.name}</td>
    <td style={{ padding: '15px', textTransform: 'capitalize' }}>{product.category}</td>
    <td style={{ padding: '15px' }}>₹{product.price}</td>
    <td style={{ padding: '15px' }}>
      <button 
        onClick={() => onToggleStock(product._id, product.stock)}
        style={{ 
          padding: '8px 15px', 
          borderRadius: '20px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          border: 'none',
          background: product.stock > 0 ? '#d4edda' : '#f8d7da',
          color: product.stock > 0 ? '#155724' : '#721c24',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap'
        }}
      >
        {product.stock > 0 ? '✓ In Stock' : '✗ Sold Out'}
      </button>
    </td>
    <td style={{ padding: '15px' }}>
      <button onClick={() => onEdit(product)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
        Edit
      </button>
    </td>
  </tr>
));

ProductRow.displayName = 'ProductRow';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'veg',
    image: '',
    stock: 100
  });
  const [categories, setCategories] = useState([]);

  const fetchProducts = useCallback(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProducts();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories', err));
  }, [fetchProducts]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL}/products/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/products`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: Number(formData.price), stock: Number(formData.stock) })
      });
      if (res.ok) {
        resetForm();
        fetchProducts();
      }
    } catch (err) {
      alert('Failed to save product');
    }
  };

  const resetForm = useCallback(() => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '', price: '', category: 'veg', image: '', stock: 100 });
  }, []);

  const handleEdit = useCallback((product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category || 'veg',
      image: product.image || '',
      stock: product.stock !== undefined ? product.stock : 100
    });
    setEditingId(product._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleStock = useCallback(async (id, currentStock) => {
    try {
      const newStock = currentStock > 0 ? 0 : 100;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => p._id === id ? { ...p, stock: newStock } : p));
      }
    } catch (err) {
      alert('Failed to update stock');
    }
  }, []);

  const productList = useMemo(() => (
    <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '15px' }}>Image</th>
            <th style={{ padding: '15px' }}>Name</th>
            <th style={{ padding: '15px' }}>Category</th>
            <th style={{ padding: '15px' }}>Price</th>
            <th style={{ padding: '15px' }}>Status</th>
            <th style={{ padding: '15px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <ProductRow 
              key={product._id} 
              product={product} 
              onEdit={handleEdit} 
              onToggleStock={toggleStock} 
            />
          ))}
        </tbody>
      </table>
    </div>
  ), [products, handleEdit, toggleStock]);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading products...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', color: '#333', fontWeight: 'bold' }}>Product Management</h1>
        <button onClick={() => {
           if (showForm) resetForm();
           else setShowForm(true);
        }} className="btn">
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: '30px', border: '1px solid #eee' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div style={inputGroup}>
              <label style={labelStyle}>Product Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>Price (₹)</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
             <label style={labelStyle}>Description</label>
             <textarea required name="description" value={formData.description} onChange={handleChange} style={{...inputStyle, resize: 'vertical'}} rows="2" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div style={inputGroup}>
              <label style={labelStyle}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>Stock (Quantity)</label>
              <input required type="number" name="stock" value={formData.stock} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>Image URL</label>
              <input type="text" name="image" value={formData.image} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          <button type="submit" className="btn" style={{ width: '100%', padding: '15px' }}>
            {editingId ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      )}

      {products.length === 0 ? (
        <div style={{ background: 'white', padding: '60px', borderRadius: '12px', textAlign: 'center', color: '#888', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          No products found. Start adding your traditions!
        </div>
      ) : productList}
    </div>
  );
}

const inputGroup = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '0.85rem', fontWeight: 'bold', color: '#666' };
const inputStyle = {
  width: '100%',
  padding: '10px 15px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s'
};
