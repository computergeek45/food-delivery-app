const ProductCard = ({ product }) => {
  return (
    //<div className="card bg-base-100 shadow-md">
    <div className="card bg-white shadow-md border">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.description}</p>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">
            ₹{product.offerPrice || product.price}
          </span>
          {product.offerPrice && (
            <span className="line-through text-gray-400">
              ₹{product.price}
            </span>
          )}
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
