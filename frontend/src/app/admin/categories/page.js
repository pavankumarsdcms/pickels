"use client";
import { useState, useEffect } from 'react';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState({ name: '', description: '' });

  const fetchCats = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCat)
    });
    if (res.ok) {
      setNewCat({ name: '', description: '' });
      fetchCats();
    }
  };

  const deleteCat = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, { method: 'DELETE' });
      fetchCats();
    }
  };

  const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Category Management</h1>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Add New Category</h3>
        <input 
          required 
          placeholder="Category Name" 
          value={newCat.name} 
          onChange={e => setNewCat({ ...newCat, name: e.target.value })} 
          style={inputStyle} 
        />
        <input 
          placeholder="Description (Optional)" 
          value={newCat.description} 
          onChange={e => setNewCat({ ...newCat, description: e.target.value })} 
          style={{ ...inputStyle, width: '300px' }} 
        />
        <button type="submit" className="btn">Add Category</button>
      </form>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Category Name</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Slug</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>{cat.name}</td>
                <td style={{ padding: '15px' }}>{cat.slug}</td>
                <td style={{ padding: '15px' }}>{cat.description}</td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => deleteCat(cat._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
