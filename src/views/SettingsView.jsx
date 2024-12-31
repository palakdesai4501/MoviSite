import { useContext, useState } from 'react';
import { UserContext } from "../contexts/UserContext";

const SettingsView = () => {
    const { user, setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        genres: user.genres.map((genre) => ({ ...genre })) // Preserve the genre structure
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGenreChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            genres: prev.genres.map((genre) =>
                genre.genre === value ? { ...genre, selected: checked } : genre
            )
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({ ...user, ...formData });
    };

    return (
        <div>
            <h2>Settings</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled // Email is displayed but cannot be changed
                    />
                </div>
                <div>
                    <label>Preferred Genres</label>
                    <div>
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
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default SettingsView;
