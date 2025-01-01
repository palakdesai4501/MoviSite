import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const SettingsView = () => {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    genres: user.genres.map((genre) => ({ ...genre })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.map((genre) =>
        genre.genre === value ? { ...genre, selected: checked } : genre
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
    alert("Settings updated successfully!");
  };

  return (
    <div className="settings-view">
      <form onSubmit={handleSubmit} className="settings-form">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-form-group">
          <label htmlFor="firstName" className="settings-form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="settings-input"
          />
        </div>
        <div className="settings-form-group">
          <label htmlFor="lastName" className="settings-form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="settings-input"
          />
        </div>
        <div className="settings-form-group">
          <label htmlFor="email" className="settings-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            className="settings-input"
          />
        </div>
        <div className="settings-genres">
          <label className="settings-form-label">Preferred Genres:</label>
          <div className="settings-genre-list">
            {formData.genres.map((genre) => (
              <div key={genre.genre} className="settings-genre-item">
                <input
                  type="checkbox"
                  id={genre.genre}
                  name={genre.genre}
                  value={genre.genre}
                  checked={genre.selected}
                  onChange={handleGenreChange}
                  className="settings-genre-checkbox"
                />
                <label htmlFor={genre.genre}>{genre.genre}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="settings-save-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsView;
