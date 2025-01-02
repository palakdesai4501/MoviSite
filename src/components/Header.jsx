import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const { user } = useContext(UserContext); // Access user data from context

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login state
    console.log('User logged out');
  };

  return (
    <header>
      <h1>MovieDig.org</h1>
      <nav>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <span>Hello {user?.firstName}!</span>
            <Link to="/movies">Movies</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
