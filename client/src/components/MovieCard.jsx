import { StarIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeformat from '../lib/timeFormat';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center 
      p-3 bg-gray-800 rounded-2xl hover:translate-y-1 duration-300 w-64  ">

      {/* Movie Poster */}
      <img onClick={() => { navigate(`/movie/${movie._id}`); scrollTo(0,0);}}
        src={movie.backdrop_path} alt={movie.title} className="rounded-lg h-52 w-full object-cover 
          object-right-bottom cursor-pointer"
      />

      {/* Title */}
      <p className="font-semibold mt-2 text-center break-words overflow-hidden">{movie.title}</p>

      {/* Meta Info */}
      <p className="text-sm text-gray-400 mt-2 " >
        {new Date(movie.release_date).getFullYear()} •{' '}
        {movie.genres.slice(0, 2).map((genre) => genre.name).join(' | ')} •{' '}
        {timeformat(movie.runtime)}
      </p>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-4 pb-3 w-full">
        <button
          onClick={() => {
            navigate(`/movie/${movie._id}`); scrollTo((0,0));
          }}
          className="px-4 py-2 text-xs bg-gradient-to-r from-blue-600 to-cyan-400 
            hover:from-blue-700 hover:to-cyan-500 transition rounded-full font-medium cursor-pointer"
        >
          Buy Tickets
        </button>

        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
          <StarIcon className="h-4 w-4 text-yellow-500 fill-amber-500" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
