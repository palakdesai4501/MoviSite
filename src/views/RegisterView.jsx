import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function RegisterView() {

  const genresList = [
   'Action', 'Adventure', 'Animation', 'Comedy', 'Documentary', 
  'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    genres: genresList.map((genre) => ({ genre: genre, selected: false })),
    selectedMovies: []
  });


  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  

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
      // if genre is checked its value should be true otherwise false
      // All the genre should be saved with either true or false 

      return {
        ...prev,
        genres: prev.genres.map((genre) => {
          if (genre.genre === value) {
            return { genre: genre.genre, selected: checked };
          }
          return genre;
        })
      };
    
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
    if (formData.genres.length < 3) {
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
            {formData.genres.map((genre) => (
              <div key={genre.genre}>
                <input
                  type="checkbox"
                  id={genre.genre}
                  name={genre.genre}
                  value={genre.genre}
                  checked={genre.selected}
                  onChange={handleGenreChange}
                />
                <label htmlFor={genre.genre}>{genre.genre}</label>
              </div>
            ))}
           
            
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterView;