import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import MoviesView from './views/MoviesView';
import GenreView from './views/GenreView';
import DetailView from './views/DetailView';
import CartView from './views/CartView';
import { UserProvider } from './contexts/UserContext';
import './App.css';
import SettingsView from './views/SettingsView';
import Header from './components/Header'; // Import Header component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  return (
    <UserProvider>
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route
            path="/login"
            element={<LoginView setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<RegisterView />} />
          <Route
            path="/movies"
            element={isLoggedIn ? <MoviesView /> : <LoginView setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/movies/genre/:genre_id" element={<GenreView />} />
          <Route path="/movies/details/:id" element={<DetailView />} />
          <Route path="/cart" element={<CartView />}></Route>
          <Route path="settings" element={<SettingsView />}></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
