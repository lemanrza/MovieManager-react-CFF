import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import FavoriteList from "../components/FavoriteList";

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
    Poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
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
      const res = await fetch(`https://www.omdbapi.com/?apikey=d804b740&s=${searchInput.trim()}`);
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

  const isSaveButtonDisabled = !favoriteListName.trim() || isSaved || favoriteListMovies.length === 0;
  const isGoToFavoritesDisabled = !favoriteListName.trim() || !isSaved;

  return (
    <div className="h-screen p-6">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearchClick}
        disabled={isSaved}
      />

      <div className="flex-col flex gap-10 max-w-6xl mx-auto lg:flex-row">
        <MovieList
          movies={movies}
          onSelect={setSelectedMovie}
          onFavoriteClick={handleFavoriteClick}
          favorites={favorites}
          isSaved={isSaved}
        />

        <FavoriteList
          selectedMovie={selectedMovie}
          favoriteListMovies={favoriteListMovies}
          favoriteListName={favoriteListName}
          setFavoriteListName={setFavoriteListName}
          handleRemoveFavorite={handleRemoveFavorite}
          handleSaveFavoriteList={handleSaveFavoriteList}
          isSaved={isSaved}
          isSaveButtonDisabled={isSaveButtonDisabled}
          isGoToFavoritesDisabled={isGoToFavoritesDisabled}
        />
      </div>
    </div>
  );
}
