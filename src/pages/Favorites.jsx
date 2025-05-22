import { useLocation, useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { favoriteListMovies = [], favoriteListName = "" } = location.state || {};

  if (favoriteListMovies.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Your Favorite page is empty
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center break-words border-b-2 border-red-400 pb-2">
        {favoriteListName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {favoriteListMovies.map((movie) => (
          <div
            key={movie.imdbID}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150x220?text=No+Image"
              }
              alt={movie.Title}
              className="w-36 h-52 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-3 text-center">{movie.Title}</h3>
            <a
              href={`https://www.imdb.com/title/${movie.imdbID}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              View details
            </a>

          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Go home page
        </button>
      </div>
    </div>
  );
}
