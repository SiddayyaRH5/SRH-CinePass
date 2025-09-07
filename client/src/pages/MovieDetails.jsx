import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';
import timeformat from '../lib/timeFormat';
import DateSelect from '../components/dateselect';
import { ArrowRight, Group, ShowerHead } from 'lucide-react'
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';


const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const GetShow = async () => {
    const selectedShow = dummyShowsData.find(show => show._id === id);
    if (selectedShow) {
      console.log('Selected show:', selectedShow);
      setShow({
        movie: selectedShow,
        dateTime: dummyDateTimeData
      });
    }

  }

  useEffect(() => {
    GetShow();
  }, [id]);

  if (!show) return <Loading />;

  return (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>

        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className='max-md:mx-auto rounded-xl h-104 max-w-xs object-cover'
        />
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />

          {/* Language */}
          <p className='text-blue-500 text-lg font-bold'>
            {show.movie.original_language.toUpperCase()}
          </p>

          {/* Title */}
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>
            {show.movie.title}
          </h1>

          {/* Rating */}
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className="w-5 h-5 text-yellow-500 fill-amber-500" />
            <span>{show.movie.vote_average.toFixed(1)} User Rating</span>
          </div>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed max-w-xl">
            {show.movie.overview}
          </p>

          {/* Release Date */}
          <p className="text-gray-400 text-lg font-semibold">
            {timeformat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(' | ')} •
            {show.movie.release_date.split("-")[0]}
          </p>

          {/* Buttons */}
          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm
             bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800
              rounded-md transition font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className='w-5 h-5' /> Watch Trailer
            </button>
            <a href="#dateselect" className='px-10 py-3 text-sm
             bg-gradient-to-r from-blue-600 to-cyan-400 
                hover:from-blue-800 hover:to-cyan-600 rounded-md transition 
                font-medium cursor-pointer active:scale-95'>
              Buy Tickets
            </a>
            <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
              <Heart className='w-5 h-5 hover:fill-red-500' />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className='text-xl font-semibold mt-20'>Your Favourite Cast</p>
      <div className='overflow-x-auto no-scrollbar pb-4 mt-4'>
        <div className='flex gap-4 px-4'>
          {show.movie.casts?.slice(0, 15).map((cast, index) => (
            <div key={index} className='flex flex-col items-center text-center min-w-[80px]'>
              <img
                src={cast.profile_path}
                alt={cast.name}
                className='rounded-full w-20 h-20 object-cover'
              />
              <p className='text-sm mt-1'>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className='flex justify-center mt-20'>
        <button onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
          className='px-10 py-3 text-sm bg-gradient-to-r from-blue-600 to-cyan-400 
                hover:from-blue-800 hover:to-cyan-600kmoyh transition  rounded-md font-medium cursor-pointer'>
          Show more
        </button>
      </div>


    </div>
  );
}

export default MovieDetails;
