const ReviewCard = ({ title, body, name, date }) => {
  return (
    <div className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden">

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="text-orange-400 text-sm">★</span>
            ))}
        </div>

        <h3 className="font-bold text-base text-white mb-2 leading-snug">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{body}</p>

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;