import axios from "axios";
import React, { useEffect, useState } from "react";
// import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

import familyJSON from "../genres/family.json";
import comedyJSON from "../genres/comedy.json";
import actionJSON from "../genres/action.json";
import romanceJSON from "../genres/romance.json";
import mysteryJSON from "../genres/mystery.json";
import horrorJSON from "../genres/horror.json";
import dramaJSON from "../genres/drama.json";

const Row = ({ title, fetchURL, rowID, genre }) => {
  const [movies, setMovies] = useState([]);
  const [like, setLike] = useState(false);
  // const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (genre) {
      switch (genre) {
        case "family":
          setMovies(familyJSON.results);
          break;
        case "comedy":
          setMovies(comedyJSON.results);
          break;
        case "action":
          setMovies(actionJSON.results);
          break;
        case "romance":
          setMovies(romanceJSON.results);
          break;
        case "mystery":
          setMovies(mysteryJSON.results);
          break;
        case "horror":
          setMovies(horrorJSON.results);
          break;
        case "drama":
          setMovies(dramaJSON.results);
          break;
        default:
          setMovies([]);
      }
    } else {
      axios
        .get(fetchURL, {
          params: {
            api_key: process.env.REACT_APP_TMDB_KEY,
            page: 1,
          },
        })
        .then((response) => {
          setMovies(response.data.results);
        });
    }
  }, [fetchURL, genre]);

  const scrollLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const scrollRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);
  const saveMovie = async (item) => {
    if (user?.email) {
      setLike(!like);
      // setSaved(true);
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Log in to save a movie");
    }
  };

  const truncateTitle = (title) => {
    if (title?.length > 30) return title.slice(0, 30) + "...";
    else return title;
  };

  const [trailer, setTrailer] = useState("");
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleTrailer = async (movieTitle) => {
    if (trailer) setTrailer("");
    else {
      const trailerID = await movieTrailer(movieTitle, { id: true });
      setTrailer(trailerID);
    }
  };

  return (
    <div>
      <h2 className="text-white font-bold p-4 md:text-xl">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={scrollLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            // <Movie key={id} item={item} />

            // MOVIE ----------------------------------------------
            <div className="w-[160px] sm:w-[200px] md:w-[240] lg:w-[280] inline-block cursor-pointer relative p-2">
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p
                  className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
                  onClick={async () => await handleTrailer(item?.title)}
                >
                  {truncateTitle(item?.title)}
                </p>

                <p onClick={async () => await saveMovie(item)}>
                  {like ? (
                    <FaHeart className="absolute top-4 left-4 text-gray-300" />
                  ) : (
                    <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                  )}
                </p>
              </div>
            </div>
            // MOVIE ----------------------------------------------
          ))}
        </div>
        <MdChevronRight
          onClick={scrollRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
      {trailer && (
        <YouTube videoId={trailer} opt={opts} className="flex justify-center" />
      )}
    </div>
  );
};

export default Row;
