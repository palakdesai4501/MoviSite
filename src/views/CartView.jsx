import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import React from "react";

const CartView = () => {
  const { user, setUser } = useContext(UserContext);
  console.log("user", user);

  if (!user || !user.selectedMovies) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }
  const { selectedMovies } = user;

  const removeFromCart = (movie) => {
    setUser({
      ...user,
      selectedMovies: selectedMovies.filter((item) => item.id !== movie.id),
    });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-grid">
        {selectedMovies.map((movie) => (
          <div key={movie.id} className="cart-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="cart-movie-image"
            />
            <h3 className="cart-movie-title">{movie.title}</h3>
            <button
              onClick={() => removeFromCart(movie)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartView;
