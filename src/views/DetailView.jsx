import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailView() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=9c47bbe2d7088241e1ab950419637754&append_to_response=videos`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data) {
          setMovieDetails(data);

          const trailersData = data.videos?.results || [];
          const filteredTrailers = trailersData.filter(
            (video) => video.type === 'Trailer'
          );
          setTrailers(filteredTrailers);
        } else {
          setError('No movie details found.');
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details.');
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-view">
      <h1>{movieDetails.title || 'N/A'}</h1>
      <p><strong>Release Date:</strong> {movieDetails.release_date || 'N/A'}</p>
      <p><strong>Runtime:</strong> {movieDetails.runtime || 'N/A'} minutes</p>
      <p>
  <strong>Overview:</strong>
  {movieDetails.overview || "N/A"}
</p>

      <p><strong>Overview:</strong> {movieDetails.overview || 'N/A'}</p>
      <p><strong>Rating:</strong> {movieDetails.vote_average || 'N/A'} / 10</p>
      <p><strong>Language:</strong> {movieDetails.original_language?.toUpperCase() || 'N/A'}</p>

      <div className="trailers">
        <h2>Trailers</h2>
        {trailers.length > 0 ? (
          trailers.map((trailer) => (
            <div key={trailer.id} className="trailer">
              <h3>{trailer.name}</h3>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No trailers available.</p>
        )}
      </div>
    </div>
  );
}

export default DetailView;
