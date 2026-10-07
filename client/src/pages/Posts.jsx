import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/posts");
                setPosts(response.data);
            } catch (error) {
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Explore Blogs
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Discover stories and ideas from our community.
                        </p>
                    </div>

                    <Link
                        to="/create-post"
                        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
                    >
                        + Create Post
                    </Link>
                </div>

                {loading && (
                    <p className="text-gray-400">
                        Loading posts...
                    </p>
                )}

                {error && (
                    <p className="bg-red-500 p-3 rounded-lg">
                        {error}
                    </p>
                )}

                {!loading && !error && posts.length === 0 && (
                    <div className="bg-gray-800 rounded-xl p-10 text-center">
                        <h2 className="text-2xl font-semibold mb-2">
                            No posts yet
                        </h2>

                        <p className="text-gray-400">
                            Be the first person to create a blog post.
                        </p>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                        >

                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}

                            <div className="p-6">

                                <span className="inline-block bg-blue-600 text-sm px-3 py-1 rounded-full mb-3">
                                    {post.category}
                                </span>

                                <h2 className="text-xl font-bold mb-3">
                                    {post.title}
                                </h2>

                                <p className="text-gray-400 mb-4 line-clamp-3">
                                    {post.content}
                                </p>

                                <div className="text-sm text-gray-500">
                                    By {post.author?.name || "Unknown"}
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Posts;