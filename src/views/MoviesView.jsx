import Header from '../components/Header';
import Footer from '../components/Footer';
import Genres from '../components/Genres';

function MoviesView() {
  // Define the list of genres with their IDs
  const genreList = [
    { genre: 'Action', id: 28 },
    { genre: 'Crime', id: 80 },
    { genre: 'Horror', id: 27 },
    { genre: 'Thriller', id: 53 },
    { genre: 'Adventure', id: 12 },
    { genre: 'Family', id: 10751 },
    { genre: 'Music', id: 10402 },
    { genre: 'War', id: 10752 },
    { genre: 'Animation', id: 16 },
    { genre: 'Fantasy', id: 14 },
  ];

  return (
    <div className="movies-view">
      <Header />
      <Genres genres={genreList} />
      <Footer />
    </div>
  );
}

export default MoviesView;
