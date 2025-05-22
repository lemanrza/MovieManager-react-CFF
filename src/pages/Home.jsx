import { useState } from "react";
import { Link } from "react-router-dom";

const initialMovies = [
  {
    imdbID: "tt0068646",
    Title: "The Godfather",
    Year: "1972",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0137523",
    Title: "Fight Club",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0482571",
    Title: "The Prestige",
    Year: "2006",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg",
  },
  {
    imdbID: "tt0120689",
    Title: "The Green Mile",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX300.jpg",
  },
  {
    imdbID: "tt0816692",
    Title: "Interstellar",
    Year: "2014",
    Poster: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
  },
  {
    imdbID: "tt2713180",
    Title: "Fury",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjA4MDU0NTUyN15BMl5BanBnXkFtZTgwMzQxMzY4MjE@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1392214",
    Title: "Prisoners",
    Year: "2013",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt2119532",
    Title: "Hacksaw Ridge",
    Year: "2016",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0050083",
    Title: "12 Angry Men",
    Year: "1957",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0076584",
    Title: "The Inglorious Bastards",
    Year: "1978",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BY2Q2Yzk1Y2MtZTBjOC00MDdmLWIwM2QtNTJjZmIyYmY3NjVjXkEyXkFqcGc@._V1_SX300.jpg",
  },
];

export default function MovieApp() {
  const [movies, setMovies] = useState(initialMovies);
  const [searchInput, setSearchInput] = useState("");
  const [favorites, setFavorites] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoriteListMovies, setFavoriteListMovies] = useState([]);
  const [favoriteListName, setFavoriteListName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSearchClick = async () => {
    if (!searchInput.trim()) return;

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=d804b740&s=${searchInput.trim()}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
      setSelectedMovie(null);
    } catch (error) {
      console.error("API error:", error);
      setMovies([]);
    }
  };

  const handleFavoriteClick = (imdbID) => {
    if (favorites[imdbID] || isSaved) return;

    setFavorites((prev) => ({ ...prev, [imdbID]: true }));

    const movieToAdd = movies.find((m) => m.imdbID === imdbID);
    if (movieToAdd && !favoriteListMovies.some((m) => m.imdbID === imdbID)) {
      setFavoriteListMovies((prev) => [...prev, movieToAdd]);
    }
  };

  const handleRemoveFavorite = (imdbID) => {
    if (isSaved) return;

    setFavoriteListMovies((prev) => prev.filter((m) => m.imdbID !== imdbID));
    setFavorites((prev) => {
      const copy = { ...prev };
      delete copy[imdbID];
      return copy;
    });
  };

  const handleSaveFavoriteList = () => {
    if (!favoriteListName.trim()) return;
    setIsSaved(true);
  };

  const isFavoriteDisabled = (imdbID) => favorites[imdbID] || isSaved;
  const isSaveButtonDisabled = !favoriteListName.trim() || isSaved || favoriteListMovies.length === 0;
  const isGoToFavoritesDisabled = !favoriteListName.trim() || !isSaved;

  return (
    <div className=" h-screen p-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-400 rounded-l px-3 py-1 w-80 focus:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
          disabled={isSaved}
        />
        <button
          onClick={handleSearchClick}
          className={`bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700 transition ${isSaved ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={isSaved}
        >
          Search
        </button>
      </div>

      <div className="flex-col flex gap-10 max-w-6xl mx-auto lg:flex-row">
        <div className="flex flex-col gap-5 border border-gray-300 rounded-lg p-4 w-full lg:w-1/2 overflow-y-auto max-h-[500px]">
          {movies.length === 0 ? (
            <p className="text-center text-gray-500">No movies found</p>
          ) : (
            movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex gap-4 cursor-pointer rounded p-2"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/80x120?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-30 h-42 object-cover rounded-md"
                  onClick={() => setSelectedMovie(movie)}
                />
                <div className="flex flex-col justify-center flex-grow">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {movie.Title}
                  </h3>
                  <p className="text-md text-gray-600">Year: {movie.Year}</p>
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);
                      handleFavoriteClick(movie.imdbID);
                    }}
                    disabled={isFavoriteDisabled(movie.imdbID)}
                    className={`mt-2 w-[100px] py-1 rounded text-md ${isFavoriteDisabled(movie.imdbID)
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-purple-600 text-white cursor-pointer"
                      }`}
                  >
                    {favorites[movie.imdbID] ? "Favorited" : "Favorite"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border border-gray-400 rounded-lg p-6 w-full lg:w-1/2 h-[500px] relative flex flex-col">
          {selectedMovie ? (
            <>
              <div className="flex gap-3 overflow-x-auto mb-4 p-2 border border-gray-300 rounded">
                {favoriteListMovies.length === 0 ? (
                  <p className="text-gray-500 whitespace-nowrap">Heç bir favorit yoxdur.</p>
                ) : (
                  favoriteListMovies.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded whitespace-nowrap"
                    >
                      <span>{movie.Title}</span>
                      <button
                        onClick={() => handleRemoveFavorite(movie.imdbID)}
                        disabled={isSaved}
                        className={`text-red-600 font-bold hover:text-red-800 transition ${isSaved ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                          }`}
                        title={isSaved ? "Siyahı yadda saxlandığı üçün silmək olmaz" : "Remove from favorites"}
                      >
                        &times;
                      </button>
                    </div>
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
                  className={`px-4 py-1 rounded ${isSaveButtonDisabled
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                    }`}
                >
                  Save List
                </button>
                <Link
                  to="/favorites"
                  state={{ favoriteListMovies, favoriteListName }}
                  className={`px-4 py-1 rounded ${isGoToFavoritesDisabled
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                    }`}
                  aria-disabled={isGoToFavoritesDisabled}
                  onClick={(e) => {
                    if (isGoToFavoritesDisabled) e.preventDefault();
                  }}
                >
                  Go to Favorites page
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-400 flex-grow flex items-center justify-center">
              Please add films to see details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
