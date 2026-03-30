"use client";
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check local storage
    if (localStorage.getItem('admin_token') === 'pickles123') {
       setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'pickles123') {
      localStorage.setItem('admin_token', 'pickles123');
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    router.push('/admin');
  };

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f5f5f5' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h1 style={{ color: 'var(--color-primary)', marginBottom: '20px' }}>Admin Login</h1>
          <input 
            type="password" 
            placeholder="Enter password..." 
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '10px 15px', width: '250px', display: 'block', margin: '0 auto 20px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" className="btn" style={{ width: '250px' }}>Login</button>
        </form>
      </div>
    );
  }

  const getButtonStyle = (path) => ({
    textAlign: 'left',
    background: pathname === path ? 'rgba(255,255,255,0.1)' : 'none',
    border: 'none',
    color: pathname === path ? '#f1c40f' : 'white',
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '4px',
    fontWeight: pathname === path ? 'bold' : 'normal',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fafafa' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '30px 20px', position: 'fixed', height: '100vh' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#f39c12', fontWeight: 'bold' }}>🏺 Pickle Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button onClick={() => router.push('/admin')} style={getButtonStyle('/admin')}>Overview & Orders</button>
          <button onClick={() => router.push('/admin/revenue')} style={getButtonStyle('/admin/revenue')}>📈 Revenue & Analysis</button>
          <button onClick={() => router.push('/admin/products')} style={getButtonStyle('/admin/products')}>📦 Products</button>
          <button onClick={() => router.push('/admin/categories')} style={getButtonStyle('/admin/categories')}>📁 Categories</button>
          <button onClick={logout} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#e74c3c', fontSize: '1.1rem', cursor: 'pointer', padding: '10px', marginTop: '40px', opacity: 0.8 }}>Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', marginLeft: '250px' }}>
        {children}
      </main>
    </div>
  );
}
