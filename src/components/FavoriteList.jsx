import { Link } from "react-router-dom";
import FavoriteItem from "./FavoriteItem";

export default function FavoriteList({
  selectedMovie,
  favoriteListMovies,
  favoriteListName,
  setFavoriteListName,
  handleRemoveFavorite,
  handleSaveFavoriteList,
  isSaved,
  isSaveButtonDisabled,
  isGoToFavoritesDisabled,
}) {
  if (!selectedMovie) {
    return (
      <div className="border border-gray-400 rounded-lg p-6 w-full lg:w-1/2 h-[500px] flex items-center justify-center text-gray-400">
        Please add films to see details
      </div>
    );
  }

  return (
    <div className="border border-gray-400 rounded-lg p-6 w-full lg:w-1/2 h-[500px] relative flex flex-col">
      <div className="flex gap-3 overflow-x-auto mb-4 p-2 border border-gray-300 rounded">
        {favoriteListMovies.length === 0 ? (
          <p className="text-gray-500 whitespace-nowrap">Heç bir favorit yoxdur.</p>
        ) : (
          favoriteListMovies.map((movie) => (
            <FavoriteItem
              key={movie.imdbID}
              movie={movie}
              onRemove={handleRemoveFavorite}
              disabled={isSaved}
            />
          ))
        )}
      </div>

      <input
        type="text"
        placeholder="Enter name for favorites list name"
        className="border border-gray-300 rounded w-full mb-4 px-3 py-1 focus:outline-none"
        value={favoriteListName}
        onChange={(e) => {
          if (!isSaved) setFavoriteListName(e.target.value);
        }}
        disabled={favoriteListMovies.length === 0 || isSaved}
      />

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleSaveFavoriteList}
          disabled={isSaveButtonDisabled}
          className={`px-4 py-1 rounded ${isSaveButtonDisabled ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"}`}
        >
          Save List
        </button>
        <Link
          to="/favorites"
          state={{ favoriteListMovies, favoriteListName }}
          className={`px-4 py-1 rounded ${isGoToFavoritesDisabled ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"}`}
          aria-disabled={isGoToFavoritesDisabled}
          onClick={(e) => {
            if (isGoToFavoritesDisabled) e.preventDefault();
          }}
        >
          Go to Favorites page
        </Link>
      </div>
    </div>
  );
}
