import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", formData);

            login(response.data.user, response.data.token);

            navigate("/posts");
        } catch (error) {
            setError(
                error.response?.data?.message || "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">

            {/* Navigation Bar */}
            <Navbar />

            {/* Login Section */}
            <div className="flex items-center justify-center px-4 py-20">

                <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">

                    <h1 className="text-3xl font-bold text-white text-center mb-6">
                        Welcome Back
                    </h1>

                    {error && (
                        <p className="bg-red-500 text-white p-3 rounded-lg mb-4">
                            {error}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;