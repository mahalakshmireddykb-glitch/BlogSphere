import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    to="/"
                    className="text-2xl font-bold text-white"
                >
                    BlogSphere
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white"
                    >
                        Home
                    </Link>

                    {user ? (
                        <>
                            <span className="text-gray-300">
                                Hi, {user.name}
                            </span>

                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-300 hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;