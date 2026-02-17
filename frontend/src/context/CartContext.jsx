import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    const exist = cart.find((p) => p._id === product._id);
    if (exist) {
      setCart(
        cart.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p._id !== id));
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((p) =>
        p._id === id ? { ...p, quantity: quantity } : p
      )
    );
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
