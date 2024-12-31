import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1 style={{ fontSize: '50px' }}>MovieDig.org</h1>
        <p>Digging through the classics on site since 2024.</p>
        <Link to="/login">
          <button type="button">Already have an account? Sign In!</button>
        </Link>
        <Link to="/register">
          <button type="button">New? Sign Up!</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
