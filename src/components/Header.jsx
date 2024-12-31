import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>MovieDig.org</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}

export default Header;

