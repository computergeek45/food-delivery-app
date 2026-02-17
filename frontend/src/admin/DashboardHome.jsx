import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const DashboardHome = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const productsRes = await fetch("http://localhost:5000/api/products");
      const productsData = await productsRes.json();
      setProductsCount(productsData.length);

      const ordersRes = await fetch("http://localhost:5000/api/orders");
      const ordersData = await ordersRes.json();
      setOrders(ordersData);

      const totalRevenue = ordersData.reduce(
        (sum, o) => sum + o.totalAmount,
        0
      );
      setRevenue(totalRevenue);
    } catch (err) {
      console.error("Dashboard load failed");
    }
  };

  // Chart data
  const chartData = orders.map((o) => ({
    date: new Date(o.createdAt).toLocaleDateString(),
    amount: o.totalAmount,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-50 p-8">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-3 flex items-center gap-4">
          <span className="text-orange-600">📊</span>
          Admin Overview
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor your platform's performance and key metrics
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mt-4 rounded-full"></div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Products Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-l-4 border-blue-500 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🍕</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Total Products
              </p>
              <h2 className="text-4xl font-bold text-gray-900">{productsCount}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
              Active
            </span>
            <span className="text-gray-500">Menu items available</span>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-l-4 border-purple-500 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-3xl">📦</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Total Orders
              </p>
              <h2 className="text-4xl font-bold text-gray-900">{orders.length}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">
              All Time
            </span>
            <span className="text-gray-500">Orders placed</span>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-l-4 border-orange-700 transform hover:-translate-y-1 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-orange-100 uppercase tracking-wider mb-1">
                  Total Revenue
                </p>
                <h2 className="text-4xl font-bold text-white">₹{revenue.toLocaleString()}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium">
                💹 Earnings
              </span>
              <span className="text-orange-100">Lifetime revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* GRAPH SECTION */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="text-orange-600">📈</span>
            Revenue Trend
          </h2>
          <p className="text-gray-600">Track your revenue performance over time</p>
        </div>

        {chartData.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="text-7xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h3>
            <p className="text-gray-500 text-lg">Orders will appear here once customers start placing them</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '2px solid #008080',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                  labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                  itemStyle={{ color: '#f97316', fontWeight: '600' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#000080"
                  strokeWidth={3}
                  fill="url(#colorAmount)"
                  dot={{ fill: '#4169E1', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, fill: '#4169E1' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Avg Rating</p>
              <p className="text-xl font-bold text-gray-900">4.8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👥</span>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Total Customers</p>
              <p className="text-xl font-bold text-gray-900">{orders.length > 0 ? orders.length * 2 : 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Avg Delivery</p>
              <p className="text-xl font-bold text-gray-900">28 min</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Success Rate</p>
              <p className="text-xl font-bold text-gray-900">98%</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;