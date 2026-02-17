import ReviewCard from "./ReviewCard";

const LatestReviews = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
            Latest Reviews
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our happy customers have to say about their experience
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <ReviewCard
            title="Amazing food!"
            body="The food was delivered hot and tasted absolutely delicious."
            name="Aisha"
            date="12 Feb 2025"
          />

          <ReviewCard
            title="Fast delivery"
            body="Quick delivery and great packaging. Will order again!"
            name="Rahul"
            date="10 Feb 2025"
          />

          <ReviewCard
            title="Loved it"
            body="Wide variety of dishes and easy ordering experience."
            name="Sneha"
            date="8 Feb 2025"
          />
        </div>

      </div>
    </section>
  );
};

export default LatestReviews;