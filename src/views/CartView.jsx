/**
 * 4. Create a view called CartView.jsx that can be accessed via /cart URL. Each movie in the
cart should have its trailer image, title and a button to remove it.

 */

import { useContext } from 'react';

import { UserContext } from "../contexts/UserContext";

import React from 'react'

const CartView = () => {
    const { user, setUser } = useContext(UserContext);
console.log("user", user);
    if (!user || !user.selectedMovies) {
        return <p>Your cart is empty.</p>;
      }
    const { selectedMovies } = user;
    
    const removeFromCart = (movie) => {
        setUser({ ...user, selectedMovies: selectedMovies.filter((item) => item.id !== movie.id) });
    }

  return (
    
    <div>
        {selectedMovies.map((movie) => (
            <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button onClick={() => removeFromCart(movie)}>Remove</button>
            </div>
        ))}
    </div>
  )
}

export default CartView
