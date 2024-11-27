import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import { MovieCard } from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=999ad5ba";
const movie1 = {
  Title: "Barbie",
  Year: "2023",
  " imdbID": "tt1517268",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BYjI3NDU0ZGYtYjA2YS00Y2RlLTgwZDAtYTE2YTM5ZjE1M2JlXkEyXkFqcGc@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleSearchClick = (movieTitle) => {
    const searchQuery = encodeURIComponent(movieTitle);
    const googleUrl = `https://www.google.com/search?q=${searchQuery}`;
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

    // Uncomment one of the following lines to choose the platform
    window.open(googleUrl, "_blank"); // Open Google search in a new tab
    // window.open(youtubeUrl, "_blank");  // Open YouTube search in a new tab
  };

  useEffect(() => {
    searchMovies("barbie");
  }, []);
  return (
    <>
      <div className="app">
        <h1>Movie Land</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => handleSearchClick(movie.Title)}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
