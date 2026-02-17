import { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8fafc"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "4px solid #e2e8f0",
          borderTop: "4px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "32px 16px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {/* Page Header */}
        <div style={{
          marginBottom: "32px"
        }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 8px 0"
          }}>Orders Management</h1>
          <p style={{
            fontSize: "14px",
            color: "#64748b",
            margin: "0"
          }}>View and manage all customer orders</p>
        </div>

        {orders.length === 0 ? (
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "64px 32px",
            textAlign: "center",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px",
              backgroundColor: "#f1f5f9",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px"
            }}>📦</div>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#334155",
              margin: "0 0 8px 0"
            }}>No orders yet</h3>
            <p style={{
              fontSize: "14px",
              color: "#64748b",
              margin: "0"
            }}>Orders will appear here once customers place them</p>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  transition: "box-shadow 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* HEADER */}
                <div style={{
                  backgroundColor: "#f8fafc",
                  padding: "16px 20px",
                  borderBottom: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <span style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#0f172a"
                    }}>
                      Order #{order._id.slice(-6)}
                    </span>
                    <span style={{
                      fontSize: "13px",
                      color: "#64748b",
                      fontWeight: "500"
                    }}>•</span>
                    <span style={{
                      fontSize: "13px",
                      color: "#64748b",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.3px"
                    }}>
                      {order.payment.method}
                    </span>
                  </div>
                  <span style={{
                    backgroundColor: 
                      order.orderStatus === "Delivered" ? "#dcfce7"
                      : order.orderStatus === "Processing" ? "#fef3c7"
                      : order.orderStatus === "Shipped" ? "#dbeafe"
                      : "#f1f5f9",
                    color: 
                      order.orderStatus === "Delivered" ? "#15803d"
                      : order.orderStatus === "Processing" ? "#b45309"
                      : order.orderStatus === "Shipped" ? "#1e40af"
                      : "#475569",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: "600",
                    letterSpacing: "0.2px"
                  }}>
                    {order.orderStatus}
                  </span>
                </div>

                {/* ITEMS */}
                <div style={{
                  padding: "20px"
                }}>
                  <div style={{
                    marginBottom: "16px"
                  }}>
                    <h4 style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      margin: "0 0 12px 0"
                    }}>Order Items</h4>
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 0",
                          borderBottom: i < order.items.length - 1 ? "1px solid #f1f5f9" : "none"
                        }}
                      >
                        <div style={{
                          flex: 1
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#334155",
                            fontWeight: "500"
                          }}>
                            {item.name}
                          </span>
                          <span style={{
                            fontSize: "14px",
                            color: "#94a3b8",
                            marginLeft: "8px"
                          }}>
                            × {item.quantity}
                          </span>
                        </div>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a"
                        }}>
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* ADDRESS */}
                  <div style={{
                    backgroundColor: "#f8fafc",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    marginTop: "16px"
                  }}>
                    <h4 style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      margin: "0 0 8px 0"
                    }}>Delivery Address</h4>
                    <p style={{
                      fontSize: "14px",
                      color: "#475569",
                      lineHeight: "1.5",
                      margin: "0"
                    }}>
                      <span style={{ fontWeight: "600", color: "#334155" }}>{order.address.name}</span>
                      <br />
                      {order.address.street}
                      <br />
                      {order.address.city} – {order.address.pincode}
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div style={{
                  backgroundColor: "#f8fafc",
                  padding: "16px 20px",
                  borderTop: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{
                    fontSize: "13px",
                    color: "#64748b",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px"
                  }}>
                    Total Amount
                  </span>
                  <span style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#0f172a"
                  }}>
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;