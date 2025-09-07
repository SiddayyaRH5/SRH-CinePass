import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'


const SeatLayout = () => {

  const groupRows = [['A', 'B'], ['C', 'D', 'E'], ['F', 'G', 'H'], ['I', 'K', 'L'],
  ['M', 'N', 'O',], ['P', 'Q',], ['R', 'S']]


  const { id } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)   // ✅ added for date
  const [show, setShow] = useState(null)

  const navigate = useNavigate()

  const GetShow = async () => {
    const Show = dummyShowsData.find(show => show._id === id)
    if (Show) {
      const firstDate = Object.keys(dummyDateTimeData)[0]   // ✅ pick first date
      setShow({
        movie: Show,
        dateTime: dummyDateTimeData
      })
      setSelectedDate(firstDate)   // ✅ set default selected date
    }
  }

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select a time slot first.")
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can select a maximum of 5 seats only.")
    }
    setSelectedSeats(prev => prev.includes(seatId) ?
      prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count = 10) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-gray-50/60
                cursor-pointer ${selectedSeats.includes(seatId) && "bg-blue-600 text-white"
                }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );


  useEffect(() => {
    GetShow()
  }, [id])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available Timings */}
      <div className='w-60 bg-gradient-to-r from-blue-800 to-cyan-600 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[selectedDate].map((item) => (
            <div
              key={item.time}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer 
                transition ${selectedTime === item.time
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white'
                  : 'hover:from-blue-900 hover:to-cyan-800 bg-gradient-to-r hover:bg-blue-800/50'
                }`} onClick={() => setSelectedTime(item.time)} >
              <ClockIcon className='w-4 h-4' />
              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className='relative flex-1  flex flex-col items-center max-md-mt-16'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='-10px' right='0' />
        <h1 className='text-2xl font-semibold mb-4'>Select Your Seats</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className='text-sm text-gray-400 mb-6'>SCREEN SIDE</p>
        <div className='flex flex-col items-center mt-5 text-sm font-semibold text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map((row) => (renderSeats(row)))}
          </div>
          <div className='grid grid-cols-2 gap-7'>
            {groupRows.slice(1).map((group, index) =>
              <div key={index}>
                {group.map((row) => (renderSeats(row)))}
              </div>
            )}
          </div>
        </div>

        <button onClick={() => {
          if (selectedSeats.length === 0) {
            return toast.error("Please select at least one seat before proceeding.");
          }
          navigate('/My-Bookings');
        }} className='flex items-center gap-1 mt-20 text-sm 
        bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-800 hover:to-cyan-600
         text-white py-3 px-10 font-semibold transition-all rounded-full cursor-pointer active:scale-95'>
          Proceed To CheckOut
          <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
        </button>

      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout
