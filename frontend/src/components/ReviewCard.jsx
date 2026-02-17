const ReviewCard = ({ title, body, name, date }) => {
  return (
    <div className="card bg-white border shadow-sm">
      <div className="card-body">
        
        {/* Stars */}
        <div className="flex gap-1 mb-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </div>

        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{body}</p>

        <div className="flex items-center gap-3 mt-auto">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-gray-400">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
