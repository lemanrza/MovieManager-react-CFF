export default function MovieItem({ movie, onSelect, onFavoriteClick, isFavoriteDisabled, isFavorited }) {
  return (
    <div key={movie.imdbID} className="flex gap-4 cursor-pointer rounded p-2">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/80x120?text=No+Image"}
        alt={movie.Title}
        className="w-30 h-42 object-cover rounded-md"
        onClick={() => onSelect(movie)}
      />
      <div className="flex flex-col justify-center flex-grow">
        <h3 className="font-semibold text-gray-900 text-lg">{movie.Title}</h3>
        <p className="text-md text-gray-600">Year: {movie.Year}</p>
        <button
          onClick={() => {
            onSelect(movie);
            onFavoriteClick(movie.imdbID);
          }}
          disabled={isFavoriteDisabled}
          className={`mt-2 w-[100px] py-1 rounded text-md ${isFavoriteDisabled ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-purple-600 text-white cursor-pointer"}`}
        >
          {isFavorited ? "Favorited" : "Favorite"}
        </button>
      </div>
    </div>
  );
}
