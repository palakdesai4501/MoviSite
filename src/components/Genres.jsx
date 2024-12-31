import { useNavigate } from 'react-router-dom';

function Genres({ genres /**prop */ }) {
  const navigate = useNavigate();

  const handleGenreClick = (id) => {
    navigate(`/movies/genre/${id}`);
  };


  return (
    <div className="genres">
      <h1>Genres</h1>
      <div className="genre-buttons">
        {genres.map((genre) => (

          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className="genre-button"
          >
            {genre.genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Genres;
