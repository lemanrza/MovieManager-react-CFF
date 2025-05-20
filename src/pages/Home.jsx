// import { useEffect, useState } from "react";

// export default function MovieApp() {
//   const [movies, setMovies] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [favorites, setFavorites] = useState({});

//   useEffect(() => {
//     if (!searchTerm) return;

//     fetch(`https://www.omdbapi.com/?apikey=d804b740&s=${searchTerm}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.Response === "True") {
//           const enrichedMovies = data.Search.map((movie) => ({
//             ...movie,
//             favorite: favorites[movie.imdbID] || false,
//           }));
//           setMovies(enrichedMovies);
//         } else {
//           setMovies([]);
//         }
//       });
//   }, [searchTerm, favorites]);

//   const handleSearchClick = () => {
//     setSearchTerm(searchInput);
//     setSelectedMovie(null);
//   };

//   const toggleFavorite = (imdbID) => {
//     setFavorites((prev) => ({
//       ...prev,
//       [imdbID]: true,
//     }));
//   };

//   return (
//     <div className="bg-yellow-50 p-6 min-h-screen">
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border border-gray-400 rounded-l px-3 py-1 w-80 focus:outline-none"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//         />
//         <button
//           onClick={handleSearchClick}
//           className="bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700 transition"
//         >
//           Search
//         </button>
//       </div>

//       <div className="flex-col flex gap-10 max-w-6xl mx-auto lg:flex-row">
//         <div className="flex flex-col gap-5 border border-gray-300 rounded-lg p-4 w-full lg:w-1/2 overflow-y-auto max-h-[600px]">
//           {movies.length === 0 ? (
//             <p className="text-center text-gray-500">No movies found</p>
//           ) : (
//             movies.map((movie) => (
//               <div
//                 key={movie.imdbID}
//                 className="flex gap-4 cursor-pointer rounded p-2 hover:bg-purple-50"
//                 onClick={() => setSelectedMovie(movie)}
//               >
//                 <img
//                   src={movie.Poster}
//                   alt={movie.Title}
//                   className="w-20 rounded-md shadow-md"
//                 />
//                 <div className="flex flex-col justify-center">
//                   <h3 className="font-semibold text-gray-900">{movie.Title}</h3>
//                   <p className="text-sm text-gray-600">Year: {movie.Year}</p>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleFavorite(movie.imdbID);
//                     }}
//                     className={`mt-2 w-[100px] py-1 rounded text-sm ${
//                       movie.favorite || favorites[movie.imdbID]
//                         ? "bg-gray-300 text-gray-700 cursor-not-allowed"
//                         : "bg-purple-600 text-white hover:bg-purple-700 transition"
//                     }`}
//                     disabled={movie.favorite || favorites[movie.imdbID]}
//                   >
//                     Favorite
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Movie Details */}
//         <div className="border border-gray-400 rounded-lg p-6 w-full lg:w-1/2 bg-yellow-50 min-h-[300px] relative">
//           {selectedMovie ? (
//             <div>
//               <h2 className="mb-4 font-bold text-xl">{selectedMovie.Title}</h2>
//               <img
//                 src={selectedMovie.Poster}
//                 alt={selectedMovie.Title}
//                 className="mb-4 w-48 rounded shadow"
//               />
//               <input
//                 type="text"
//                 placeholder="Add comment..."
//                 className="border border-gray-300 rounded w-full mb-4 px-3 py-1 focus:outline-none"
//               />
//               <div className="flex gap-3">
//                 <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition">
//                   Add to Favorite List
//                 </button>
//                 <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition">
//                   View Favorite List
//                 </button>
//               </div>
//               <button
//                 className="absolute top-2 right-2 text-red-500 font-bold text-xl cursor-pointer"
//                 onClick={() => setSelectedMovie(null)}
//                 aria-label="Close details"
//               >
//                 &times;
//               </button>
//             </div>
//           ) : (
//             <p className="text-gray-400">Select a movie to see details</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";

// export default function MovieApp() {
//   const [movies, setMovies] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [favorites, setFavorites] = useState({});

//   const handleSearchClick = async () => {
//     if (!searchInput.trim()) return;
//     setSearchTerm(searchInput);
//     setSelectedMovie(null);

//     try {
//       const res = await fetch(
//         `https://www.omdbapi.com/?apikey=d804b740&s=${searchInput.trim()}`
//       );
//       const data = await res.json();
//       if (data.Response === "True") {
//         setMovies(data.Search);
//       } else {
//         setMovies([]);
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setMovies([]);
//     }
//   };

//   const handleFavoriteClick = (imdbID) => {
//     setFavorites((prev) => ({ ...prev, [imdbID]: true }));
//   };

//   return (
//     <div className="bg-yellow-50 p-6">
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border border-gray-400 rounded-l px-3 py-1 w-80 focus:outline-none"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//         />
//         <button
//           onClick={handleSearchClick}
//           className="bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700 transition"
//         >
//           Search
//         </button>
//       </div>

//       <div className="flex-col flex gap-10 max-w-6xl mx-auto lg:flex-row">
//         <div className="flex flex-col gap-5 border border-gray-300 rounded-lg p-4 w-1/2 overflow-y-auto">
//           {movies.length === 0 ? (
//             <p className="text-center text-gray-500">No movies found</p>
//           ) : (
//             movies.map((movie) => (
//               <div
//                 key={movie.imdbID}
//                 className="flex gap-4 cursor-pointer rounded p-2"
//                 // onClick={() => setSelectedMovie(movie)}
//               >
//                 <img
//                   src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/80x120?text=No+Image"}
//                   alt={movie.Title}
//                   className="w-20 h-32 object-cover rounded-md shadow-md"
//                 />
//                 <div className="flex flex-col justify-center">
//                   <h3 className="font-semibold text-gray-900">{movie.Title}</h3>
//                   <p className="text-sm text-gray-600">Year: {movie.Year}</p>
//                   <button
//                     onClick={() => {
//                       handleFavoriteClick(movie.imdbID);
//                     }}
//                     className={`mt-2 w-[100px] py-1 rounded text-sm ${
//                       favorites[movie.imdbID]
//                         ? "bg-gray-300 text-gray-700"
//                         : "bg-purple-600 text-white cursor-pointer"
//                     }`}
//                     disabled={favorites[movie.imdbID]}
//                   >
//                     Favorite
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="border border-gray-400 rounded-lg p-6 w-1/2 bg-yellow-50 h-[300px] relative">
//           {selectedMovie ? (
//             <div>
//               <h2 className="mb-4 text-xl font-semibold">{selectedMovie.Title}</h2>
//               <input
//                 type="text"
//                 placeholder="Add comment..."
//                 className="border border-gray-300 rounded w-full mb-4 px-3 py-1 focus:outline-none"
//               />
//               <div className="flex gap-3">
//                 <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition">
//                   Add to Favorite List
//                 </button>
//                 <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition">
//                   Favorite List
//                 </button>
//               </div>
//               <button
//                 className="absolute top-2 right-2 text-red-500 font-bold text-xl cursor-pointer"
//                 onClick={() => setSelectedMovie(null)}
//               >
//                 x
//               </button>
//             </div>
//           ) : (
//             <p className="text-gray-400">Select a movie to see details</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";

const initialMovies = [
  {
    imdbID: "tt0068646",
    Title: "The Godfather",
    Year: "1972",
    Poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0137523",
    Title: "Fight Club",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0482571",
    Title: "The Prestige",
    Year: "2006",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg",
  },
  {
    imdbID: "tt0120689",
    Title: "The Green Mile",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX300.jpg",
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
    Poster: "https://m.media-amazon.com/images/M/MV5BMjA4MDU0NTUyN15BMl5BanBnXkFtZTgwMzQxMzY4MjE@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1392214",
    Title: "Prisoners",
    Year: "2013",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt2119532",
    Title: "Hacksaw Ridge",
    Year: "2016",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0050083",
    Title: "12 Angry Men",
    Year: "1957",
    Poster: "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0076584",
    Title: "The Inglorious Bastards",
    Year: "1978",
    Poster: "https://m.media-amazon.com/images/M/MV5BY2Q2Yzk1Y2MtZTBjOC00MDdmLWIwM2QtNTJjZmIyYmY3NjVjXkEyXkFqcGc@._V1_SX300.jpg",
  },
];

export default function MovieApp() {
  const [movies, setMovies] = useState(initialMovies);
  const [searchInput, setSearchInput] = useState("");
  const [favorites, setFavorites] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    setFavorites((prev) => ({ ...prev, [imdbID]: true }));
  };

  return (
    <div className="bg-yellow-50 p-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-400 rounded-l px-3 py-1 w-80 focus:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          onClick={handleSearchClick}
          className="bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

      <div className="flex-col flex gap-10 max-w-6xl mx-auto lg:flex-row">
        <div className="flex flex-col gap-5 border border-gray-300 rounded-lg p-4 w-1/2 overflow-y-auto">
          {movies.length === 0 ? (
            <p className="text-center text-gray-500">No movies found</p>
          ) : (
            movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex gap-4 cursor-pointer rounded p-2"
              >
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/80x120?text=No+Image"}
                  alt={movie.Title}
                  className="w-30 h-42 object-cover rounded-md"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-gray-900 text-lg">{movie.Title}</h3>
                  <p className="text-md text-gray-600">Year: {movie.Year}</p>
                  <button
                    onClick={(e) => {
                      setSelectedMovie(movie)
                      handleFavoriteClick(movie.imdbID);
                    }}
                    className={`mt-2 w-[100px] py-1 rounded text-md ${favorites[movie.imdbID]
                      ? "bg-gray-300 text-gray-700"
                      : "bg-purple-600 text-white cursor-pointer"
                      }`}
                    disabled={favorites[movie.imdbID]}
                  >
                     {`${favorites[movie.imdbID] ? "Favorited" : "Favorite" }`}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border border-gray-400 rounded-lg p-6 w-1/2 bg-yellow-50 h-[300px] relative">
          {selectedMovie ? (
            <div>
              <h2 className="mb-4 text-xl font-semibold">{selectedMovie.Title}</h2>
              <input
                type="text"
                placeholder="Add favorite list"
                className="border border-gray-300 rounded w-full mb-4 px-3 py-1 focus:outline-none"
              />
              <div className="flex gap-3">
                <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition">
                  Add to Favorite List
                </button>
                <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition">
                 Go to Favorite List
                </button>
              </div>
              <button
                className="absolute top-2 right-2 text-red-500 font-bold text-xl cursor-pointer"
                onClick={() => setSelectedMovie(null)}
              >
                &times;
              </button>
            </div>
          ) : (
            <p className="text-gray-400">Select a movie to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}
