"use client";
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus, trackingId = '') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus, trackingId })
      });
      if (res.ok) {
        alert(`Order ${newStatus} successfully`);
        fetchOrders();
      }
    } catch (err) {
      alert('Failed: ' + err.message);
    }
  };

  const [activeTracking, setActiveTracking] = useState({});

  if (loading) return <div>Loading orders...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 'bold' }}>Order Management</h1>
      
      {orders.length === 0 ? (
        <div style={{ background: 'white', padding: '50px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '1.2rem', color: '#999' }}>No orders found yet. Time to market your pickles!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-xl p-4 md:p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-5 border-b border-gray-200 pb-4">
                <div>
                  <span style={{ color: '#888', fontSize: '0.9rem' }}>Order #{order._id.substring(18, 24).toUpperCase()}</span>
                  <h3 style={{ fontSize: '1.4rem', margin: '5px 0' }}>{order.shippingAddress?.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>{order.shippingAddress?.phone} | {order.shippingAddress?.email}</p>
                </div>
                <div className="md:text-right mt-2 md:mt-0 flex flex-row md:flex-col justify-between items-center md:items-end">
                  <div style={{ 
                    padding: '8px 16px', 
                    borderRadius: '50px', 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold',
                    display: 'inline-block',
                    backgroundColor: order.orderStatus === 'Processing' ? '#fff3cd' : order.orderStatus === 'Shipped' ? '#d1ecf1' : order.orderStatus === 'Cancelled' ? '#f8d7da' : '#d4edda',
                    color: order.orderStatus === 'Processing' ? '#856404' : order.orderStatus === 'Shipped' ? '#0c5460' : order.orderStatus === 'Cancelled' ? '#721c24' : '#155724'
                  }}>
                    {order.orderStatus}
                  </div>
                  <p className="mt-0 md:mt-2 text-xl font-bold text-primary">₹{order.totalPrice}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,1fr)_1.5fr] gap-6 md:gap-10">
                <div>
                  <h4 style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '10px' }}>Order Items</h4>
                  {order.orderItems?.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '5px', fontSize: '0.95rem' }}>
                      <strong>{item.quantity}</strong> x {item.name} ({item.weight})
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                    <strong>Shipping Address:</strong><br/>
                    {order.shippingAddress?.street},<br/>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                  </div>
                </div>

                <div className="flex flex-col gap-4 justify-center md:border-l md:border-gray-200 md:pl-10 pt-4 md:pt-0 border-t md:border-t-0 border-gray-200">
                  {order.orderStatus === 'Processing' && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => setActiveTracking({ ...activeTracking, [order._id]: '' })}
                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'var(--color-primary)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Accept & Ship
                      </button>
                      <button 
                        onClick={() => updateStatus(order._id, 'Cancelled')}
                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', color: '#666', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {activeTracking[order._id] !== undefined && order.orderStatus !== 'Shipped' && (
                    <div style={{ padding: '15px', border: '2px solid var(--color-primary)', borderRadius: '8px', background: '#fffcfc' }}>
                      <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Enter Shipment Tracking ID:</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                          type="text" 
                          placeholder="e.g. DTDC-123456" 
                          value={activeTracking[order._id]}
                          onChange={(e) => setActiveTracking({ ...activeTracking, [order._id]: e.target.value })}
                          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <button 
                          onClick={() => updateStatus(order._id, 'Shipped', activeTracking[order._id])}
                          style={{ padding: '10px 20px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Confirm Shipping
                        </button>
                      </div>
                    </div>
                  )}

                  {order.orderStatus === 'Shipped' && (
                    <div>
                      <div style={{ padding: '10px', background: '#e1f5fe', color: '#01579b', borderRadius: '4px', marginBottom: '15px' }}>
                        <strong>Tracking ID:</strong> {order.trackingId || 'N/A'}
                      </div>
                      <button 
                        onClick={() => updateStatus(order._id, 'Delivered')}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#2ecc71', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Mark as Delivered
                      </button>
                    </div>
                  )}

                  {order.orderStatus === 'Delivered' && (
                    <div style={{ textAlign: 'center', color: '#27ae60', fontWeight: 'bold' }}>
                      ✓ Order completed successfully
                    </div>
                  )}
                  {order.orderStatus === 'Cancelled' && (
                    <div style={{ textAlign: 'center', color: '#e74c3c', fontWeight: 'bold' }}>
                      ✕ Order was cancelled
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
