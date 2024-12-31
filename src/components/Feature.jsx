import { useState, useEffect } from "react";
import { useAppContext } from "../context/ContextProvider";

function Feature() {
  const { addToCart, cart } = useAppContext();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US"
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 3));
    }
    fetchMovies();
  }, []);

  return (
    <section className="features">
      <h2>Top Picks</h2>
      <div className="movie-gallery">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <button
              onClick={() => addToCart(movie)}
              disabled={cart.some((item) => item.id === movie.id)}
            >
              {cart.some((item) => item.id === movie.id) ? "Added" : "Buy"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Feature;
