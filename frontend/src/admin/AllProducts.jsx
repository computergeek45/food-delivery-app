import { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

   const deleteProduct = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE",
  });

  fetchProducts(); // refresh list
};

const toggleAvailability = async (id) => {
  await fetch(`http://localhost:5000/api/products/${id}/toggle`, {
    method: "PUT",
  });

  fetchProducts(); // refresh list
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">All Products</h2>

      {products.length === 0 ? (
        <p className="text-center opacity-60">
          No products found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Offer</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded object-cover"
                    />
                  </td>

                  <td className="font-medium">{p.name}</td>

                  <td>{p.category}</td>

                  <td>₹{p.price}</td>

                  <td>
                    {p.offerPrice ? `₹${p.offerPrice}` : "-"}
                  </td>
                  
                  <td>
                   {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("en-IN", {
                         day: "2-digit",
                          month: "short",
                          year: "numeric",
                          })
                        : "-"}
                  </td>

                    <td>
                    <span
                      className={`badge ${
                        p.isAvailable
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {p.isAvailable ? "Available" : "Hidden"}
                    </span>
                  </td>

                  <td className="flex gap-2">
                     <button
                       className="btn btn-xs btn-error"
                       onClick={() => deleteProduct(p._id)}
                     >
                      Delete
                     </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
