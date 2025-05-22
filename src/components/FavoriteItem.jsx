export default function FavoriteItem({ movie, onRemove, disabled }) {
  return (
    <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded whitespace-nowrap">
      <span>{movie.Title}</span>
      <button
        onClick={() => onRemove(movie.imdbID)}
        disabled={disabled}
        className={`text-red-600 font-bold hover:text-red-800 transition ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        title={disabled ? "Siyahı yadda saxlandığı üçün silmək olmaz" : "Remove from favorites"}
      >
        &times;
      </button>
    </div>
  );
}
