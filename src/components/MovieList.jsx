import MovieItem from "./MovieItem";

export default function MovieList({ movies, onSelect, onFavoriteClick, favorites, isSaved }) {
  if (movies.length === 0) {
    return <p className="text-center text-gray-500">No movies found</p>;
  }

  return (
    <div className="flex flex-col gap-5 border border-gray-300 rounded-lg p-4 w-full lg:w-1/2 overflow-y-auto max-h-[500px]">
      {movies.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelect={onSelect}
          onFavoriteClick={onFavoriteClick}
          isFavoriteDisabled={favorites[movie.imdbID] || isSaved}
          isFavorited={!!favorites[movie.imdbID]}
        />
      ))}
    </div>
  );
}
