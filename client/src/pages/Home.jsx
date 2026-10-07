import Navbar from "../components/Navbar";
function Home() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl font-bold mb-6">
                    Welcome to BlogSphere
                </h1>

                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                    Share your ideas, discover interesting stories, and
                    connect with other writers through comments and discussions.
                </p>

                <div className="flex justify-center gap-4">
                    <a
                        href="/register"
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
                    >
                        Get Started
                    </a>

                    <a
                        href="/login"
                        className="border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold"
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;