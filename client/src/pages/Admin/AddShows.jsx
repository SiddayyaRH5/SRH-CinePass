import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/Admin/Title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { kconvertor } from '../../lib/kconvertor';

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowplayingmovies, setNowplayingmovies] = useState([]);
  const [selectedmovie, setSelectedmovie] = useState(null);
  const [datetimeselection, setDatetimeselection] = useState({}); // stores { date: [time1, time2] }
  const [datetimeinput, setDatetimeinput] = useState(""); // stores input value
  const [showprice, setShowprice] = useState("");

  const fetchNowplayingmovies = async () => {
    setNowplayingmovies(dummyShowsData);
  };

  const handleDateTimeAdd = () => {
    if (!datetimeinput) return;

    const [date, time] = datetimeinput.split("T");
    if (!date || !time) return;

    setDatetimeselection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });

    setDatetimeinput(""); // reset input after adding
  };

  const handleRemoveTime = (date, time) => {
    setDatetimeselection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  useEffect(() => {
    fetchNowplayingmovies();
  }, []);

  return nowplayingmovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      {/* Movies List */}
      <div className="overflow-x-auto no-scrollbar pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowplayingmovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-45 cursor-pointer
              group-hover:not-hover:opacity-60 hover:translate-y-1 transition duration-300`}
            >
              <div
                className="relative rounded-lg overflow-hidden"
                onClick={() => setSelectedmovie(movie.id)}
              >
                <img
                  src={movie.poster_path}
                  alt=""
                  className="w-full object-cover brightness-90"
                />

                <div
                  className="text-sm flex items-center justify-between p-2
                 bg-gradient-to-r from-blue-600 to-cyan-400 w-full absolute bottom-0 left-0"
                >
                  <p className="flex items-center gap-1 font-bold text-gray-400">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-amber-500" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-800 font-bold">
                    {kconvertor(movie.vote_count)} Votes
                  </p>
                </div>
              </div>

              {selectedmovie === movie.id && (
                <div
                  className="absolute top-2 right-2 flex items-center
                 justify-center bg-blue-400 h-6 w-6 rounded"
                >
                  <CheckIcon
                    className="w-4 h-4 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              )}

              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shows Price Input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            min={0}
            type="number"
            className="outline-none"
            placeholder="Enter Show Price"
            value={showprice}
            onChange={(e) => setShowprice(e.target.value)}
          />
        </div>
      </div>

      {/* Date and Time Input */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            className="outline-none rounded-md"
            value={datetimeinput}
            onChange={(e) => setDatetimeinput(e.target.value)}
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white'
                  : 'hover:from-blue-900 hover:to-cyan-800 hover:bg-blue-800/50 text-white px-3 py-2 text-sm rounded-lg cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Display Selected Times */}
      {Object.keys(datetimeselection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(datetimeselection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-blue-400 px-2 py-1 flex items-center rounded"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className='bg-gradient-to-r from-blue-600 to-cyan-400
       hover:from-blue-900 hover:to-cyan-800 hover:bg-blue-800/50
       text-white px-8 py-2 mt-6 rounded transition-all cursor-pointer '>
        Add Shows
      </button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
