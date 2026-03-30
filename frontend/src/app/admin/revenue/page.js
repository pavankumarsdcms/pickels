"use client";
import { useState, useEffect } from 'react';

export default function RevenueDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalProducts: 0,
    totalStockRemaining: 0,
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        ]);
        
        const orders = await ordersRes.json();
        const products = await productsRes.json();
        
        // Calculate Order Stats
        const revenue = orders
          .filter(o => o.orderStatus !== 'Cancelled')
          .reduce((acc, curr) => acc + curr.totalPrice, 0);
          
        const statsObj = {
          totalRevenue: revenue,
          totalOrders: orders.length,
          processingOrders: orders.filter(o => o.orderStatus === 'Processing').length,
          shippedOrders: orders.filter(o => o.orderStatus === 'Shipped').length,
          deliveredOrders: orders.filter(o => o.orderStatus === 'Delivered').length,
          cancelledOrders: orders.filter(o => o.orderStatus === 'Cancelled').length,
          totalProducts: products.length,
          totalStockRemaining: products.reduce((acc, curr) => acc + (curr.stock || 0), 0),
          lowStockProducts: products.filter(p => (p.stock < 10 || p.stock === 0))
        };
        
        setStats(statsObj);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Crunching numbers...</div>;

  return (
    <div style={{ padding: '30px' }} className="animate-fade-in">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', fontWeight: 'bold' }}>Revenue & Analytics</h1>
      
      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginBottom: '50px' }}>
        
        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} color="#2ecc71" icon="💰" />
        <StatCard title="Total Orders" value={stats.totalOrders} color="#3498db" icon="📦" />
        <StatCard title="Items Remaining" value={stats.totalStockRemaining} color="#e67e22" icon="🏺" />
        <StatCard title="Live Products" value={stats.totalProducts} color="#9b59b6" icon="🏷️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        
        {/* Order Breakdown */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Order Logistics</h3>
          <div style={flexRowStyle}>
            <StatItem label="Processing" value={stats.processingOrders} color="#f1c40f" />
            <StatItem label="Shipped" value={stats.shippedOrders} color="#3498db" />
            <StatItem label="Delivered" value={stats.deliveredOrders} color="#2ecc71" />
            <StatItem label="Cancelled" value={stats.cancelledOrders} color="#e74c3c" />
          </div>
        </div>

        {/* Stock Alerts */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Low Stock Alerts</h3>
          {stats.lowStockProducts.length === 0 ? (
            <p style={{ color: '#27ae60', fontWeight: 'bold' }}>✅ All pickles are well-stocked!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {stats.lowStockProducts.map(p => (
                <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#fff5f5', borderRadius: '4px', borderLeft: '4px solid #e74c3c' }}>
                  <span>{p.name}</span>
                  <strong style={{ color: '#e74c3c' }}>Only {p.stock} left</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  return (
    <div style={{ 
      background: 'white', 
      padding: '30px', 
      borderRadius: '16px', 
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
      borderLeft: `6px solid ${color}`,
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      <div style={{ fontSize: '2.5rem' }}>{icon}</div>
      <div>
        <h4 style={{ color: '#888', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase' }}>{title}</h4>
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '5px 0 0', color: '#333' }}>{value}</p>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>{value}</div>
      <div style={{ color: '#666', fontSize: '0.8rem' }}>{label}</div>
    </div>
  );
}

const sectionStyle = {
  background: 'white',
  padding: '30px',
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  border: '1px solid #eee'
};

const sectionTitleStyle = {
  fontSize: '1.2rem',
  marginBottom: '20px',
  borderBottom: '1px solid #eee',
  paddingBottom: '10px',
  color: '#333'
};

const flexRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px'
};
