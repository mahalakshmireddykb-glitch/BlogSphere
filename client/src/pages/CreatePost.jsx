import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function CreatePost() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        image: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            await api.post("/posts", formData);

            navigate("/posts");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create post."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold mb-2">
                    Create New Post
                </h1>

                <p className="text-gray-400 mb-8">
                    Share your thoughts and ideas with the BlogSphere community.
                </p>

                {error && (
                    <div className="bg-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6"
                >

                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter your blog title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            placeholder="Example: Technology"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Image URL
                        </label>

                        <input
                            type="url"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Content
                        </label>

                        <textarea
                            name="content"
                            placeholder="Write your blog content..."
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="10"
                            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
                        >
                            {loading ? "Publishing..." : "Publish Post"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/posts")}
                            className="border border-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreatePost;