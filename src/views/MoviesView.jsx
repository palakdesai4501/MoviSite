import Header from '../components/Header';
import Footer from '../components/Footer';
import Genres from '../components/Genres';
import { useContext } from 'react';

import { UserContext } from "../contexts/UserContext";

function MoviesView() {
  // Define the list of genres with their IDs
  const { user, setUser } = useContext(UserContext);

  // Extract the selected genres from the user object
  const selectedGenres = user.genres.filter((genre) => genre.selected);
  console.log("selectedGenres", selectedGenres);


  return (
    <div className="movies-view">

      <Genres genres={selectedGenres} />
      <Footer />
    </div>
  );
}

export default MoviesView;
