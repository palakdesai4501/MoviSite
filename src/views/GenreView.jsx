import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function GenreView() {
  const { genre_id } = useParams(); // Get the genre_id from the URL
  const [movies, setMovies] = useState([]); // Movies state
  const [currentPage, setCurrentPage] = useState(1); // Track pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages from API
  const [error, setError] = useState(null); // Track errors


// useContext to store selected movies

const { user, setUser } = useContext(UserContext);

  /**
   * 6. Add a button with the text “Buy” to the bottom of each poster tile that, when clicked,
adds the movie to the shopping cart. Once a movie has been added to the cart, the
button should say “Added” unless the item is removed from the cart.
   */

  const [cart, setCart] = useState([]); // Cart state

  
  // Function to add a movie to the cart
  const addToCart = (movie) => {
    if (!cart.find((item) => item.id === movie.id)) {
      // Add movie to cart if it's not already there
      setCart([...cart, movie]);
      setUser([...user, movie]);
      console.log("cart", user);
    }
  };



  const moviesPerPage = 20; // Number of movies per page

  // Function to fetch movies by genre
  const fetchMovies = async () => {
    try {
      setError(null); // Reset error
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=9c47bbe2d7088241e1ab950419637754&with_genres=${genre_id}&page=${currentPage}`
      );

      setMovies(response.data.results || []); // Update movies state
      setTotalPages(response.data.total_pages); // Set total pages from API
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies. Please try again later.");
    }
  };

  // Fetch movies when genre_id or currentPage changes
  useEffect(() => {
    fetchMovies();
  }, [genre_id, currentPage]);

  // Handle pagination
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
    <div className="genre-view container">
      <h2>Movies in Genre: {genre_id}</h2>

      {/* Show error if there's a problem */}
      {error && <p className="error">{error}</p>}

      {/* Movie list in grid view */}
      <div className="movie-grid">
        {movies.length > 0
          ? movies.map((movie) => (
            <div>
              <Link
                to={`/movies/details/${movie.id}`}
                key={movie.id}
                className="movie-card"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <h3>{movie.title}</h3>
                
              </Link>
              <button
              onClick={() => addToCart(movie)}
              disabled={cart.find((item) => item.id === movie.id)}
              className="buy-btn"
            >
              {cart.find((item) => item.id === movie.id) ? "Added" : "Buy"}
            </button>
              </div>
            ))
          : !error && <p>No movies found for this genre.</p>}
      </div>
    

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
}

export default GenreView;
