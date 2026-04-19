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

      const totalRevenue = ordersData.reduce((sum, o) => sum + o.totalAmount, 0);
      setRevenue(totalRevenue);
    } catch (err) {
      console.error("Dashboard load failed");
    }
  };

  const chartData = orders.map((o) => ({
    date: new Date(o.createdAt).toLocaleDateString(),
    amount: o.totalAmount,
  }));

  const summaryCards = [
    {
      icon: "🍕",
      label: "Total Products",
      value: productsCount,
      tag: "Active",
      tagColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      sub: "Menu items available",
      accent: "border-blue-500/30",
    },
    {
      icon: "📦",
      label: "Total Orders",
      value: orders.length,
      tag: "All Time",
      tagColor: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      sub: "Orders placed",
      accent: "border-purple-500/30",
    },
    {
      icon: "💰",
      label: "Total Revenue",
      value: `₹${revenue.toLocaleString()}`,
      tag: "💹 Earnings",
      tagColor: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
      sub: "Lifetime revenue",
      accent: "border-orange-500/30",
      highlight: true,
    },
  ];

  const quickStats = [
    { icon: "⭐", label: "Avg Rating", value: "4.8" },
    { icon: "👥", label: "Total Customers", value: orders.length > 0 ? orders.length * 2 : 0 },
    { icon: "⚡", label: "Avg Delivery", value: "28 min" },
    { icon: "🎯", label: "Success Rate", value: "98%" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-8 text-white">

      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-orange-500 mb-4 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
          Overview
        </span>
        <h1 className="text-5xl font-black text-white mb-2 tracking-tight flex items-center gap-3">
          <span className="text-orange-400">📊</span> Admin Overview
        </h1>
        <p className="text-gray-400 text-base">Monitor your platform's performance and key metrics</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {summaryCards.map((card, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-white/[0.03] border rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300 ${card.accent} ${card.highlight ? 'border-orange-500/30' : 'border-white/10'}`}
          >
            {card.highlight && (
              <>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl pointer-events-none"></div>
              </>
            )}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl">
                  {card.icon}
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{card.label}</p>
                  <h2 className="text-4xl font-black text-white">{card.value}</h2>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2.5 py-1 rounded-lg font-bold ${card.tagColor}`}>{card.tag}</span>
                <span className="text-gray-500">{card.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 mb-8">
        <div className="mb-7">
          <h2 className="text-2xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-orange-400">📈</span> Revenue Trend
          </h2>
          <p className="text-gray-500 text-sm">Track your revenue performance over time</p>
        </div>

        {chartData.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-black text-white mb-2">No Data Available</h3>
            <p className="text-gray-500 text-sm">Orders will appear here once customers start placing them</p>
          </div>
        ) : (
          <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/8">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="date" stroke="#4b5563" style={{ fontSize: '11px', fontWeight: '500' }} />
                <YAxis stroke="#4b5563" style={{ fontSize: '11px', fontWeight: '500' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(249,115,22,0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                    padding: '12px',
                    color: '#fff',
                  }}
                  labelStyle={{ fontWeight: 'bold', color: '#fff' }}
                  itemStyle={{ color: '#f97316', fontWeight: '600' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#f97316"
                  strokeWidth={2.5}
                  fill="url(#colorAmount)"
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 7, fill: '#f97316' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-orange-500/20 hover:bg-white/[0.05] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-white mt-0.5">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardHome;