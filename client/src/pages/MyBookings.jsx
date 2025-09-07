import React from 'react'
import { useState, useEffect } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateformat } from '../lib/dateformat'



const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])


  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] overflow-hidden'>
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>
      <h1 className='text-2xl font-semibold mb-4'>My Bookings</h1>

      {bookings.map((item, index) => (
        <div
          key={index}
          className='flex flex-col md:flex-row justify-between
             bg-gradient-to-br from-blue-900/10 via-blue-500/20 to-blue-100/10
             backdrop-blur-xl border border-white/20
             rounded-2xl mt-2 p-4 max-w-3xl w-full
             shadow-lg hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]
             transform hover:-translate-y-1 hover:scale-[1.01]
             transition-all duration-500 group '
        >
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Poster */}
            <div className="relative">
              <img
                src={item.show.movie.poster_path}
                alt={item.show.movie.title}
                className='md:max-w-30 h-auto object-contain rounded-lg
                   shadow-md group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]
                   transition-all duration-500'
              />
              {/* Subtle gradient overlay for cinematic depth */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Text Content */}
            <div className='flex flex-col justify-center text-left p-4 '>
              {/* Title */}
              <p className='text-xl font-bold tracking-wide text-white 
                    opacity-90 translate-x-[-12px]
                    transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
                {item.show.movie.title}
              </p>

              {/* Runtime */}
             
              <p className='text-sm text-gray-300 mt-1 
                    opacity-70 translate-x-[-12px]
                    transition-all duration-500 delay-100 group-hover:translate-x-0 group-hover:opacity-100'>
                ⏱ {timeFormat(item.show.movie.runtime)}
              </p>

              {/* Date */}
              <p className='text-sm text-gray-400 mt-2
                    opacity-70 translate-x-[-12px]
                    transition-all duration-500 delay-200 group-hover:translate-x-0 group-hover:opacity-100'>
                🎟 {dateformat(item.show.showDateTime)}
              </p>
            </div>
          </div>

          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3'>{currency} {item.amount}</p>
              {!item.isPaid &&
                <button className='bg-blue-500 text-white px-4 py-1.5 mb-3 
              text-sm font-medium rounded-full cursor-pointer'>
                  Pay Now
                </button>}
            </div>
            <div className='text-sm text-gray-400'>
              <p><span>Total Tickets: </span>{item.bookedSeats.length}</p>
              <p><span>Seat Number: </span>{item.bookedSeats.join(", ")}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  ) : <Loading />;
}

export default MyBookings
