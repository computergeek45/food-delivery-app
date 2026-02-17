const MenuCategoryCard = ({ title, description, image }) => {
  return (
    <div className="card bg-white border shadow-sm hover:shadow-md transition">
      <figure className="px-6 pt-6">
        <img
          src={image}
          alt={title}
          className="rounded-lg h-40 w-full object-cover"
        />
      </figure>

      <div className="card-body items-start">
        <h3 className="card-title text-lg">{title}</h3>
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MenuCategoryCard;
