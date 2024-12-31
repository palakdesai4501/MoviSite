import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function RegisterView() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    genres: []
  });
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const genresList = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance',
    'Sci-Fi', 'Thriller', 'Fantasy', 'Adventure', 'Animation',
    'Documentary', 'Mystery', 'Biography', 'Crime', 'Family'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedGenres = checked
        ? [...prev.genres, value]
        : prev.genres.filter((genre) => genre !== value);
      return { ...prev, genres: updatedGenres };
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrors('All fields are required.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors('Passwords do not match.');
      return false;
    }
    if (formData.genres.length < 10) {
      setErrors('Please select at least 10 genres.');
      return false;
    }
    setErrors('');
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUser(formData); // Store user data in context
      console.log('Registration Data:', formData); // Debugging info
      navigate('/login'); // Redirect to login page
    } else {
      alert(errors); // Alert the user with the error message
    }
  };

  return (
    <div className="register-view">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Re-enter Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
          />
        </div>
        <div className="form-group genres">
          <label>Select Your Favorite Genres (at least 10):</label>
          <div className="genre-list">
            {genresList.map((genre) => (
              <label key={genre} className="genre-item">
                <input
                  type="checkbox"
                  value={genre}
                  checked={formData.genres.includes(genre)}
                  onChange={handleGenreChange}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterView;