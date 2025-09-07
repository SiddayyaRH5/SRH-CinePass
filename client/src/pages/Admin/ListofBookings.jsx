import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/Admin/Title';
import { dateformat } from '../../lib/dateformat';

const ListofBookings = () => {

    const currency = import.meta.env.VITE_CURRENCY
  
    const [bookings, setBookings] = useState([]);
    const [isloading, setIsLoading] = useState(true);

      const getAllShows = async () => { 
        setBookings(dummyBookingData)
        setIsLoading(false)
      };

        useEffect(()=>{
          getAllShows();
        },[]);
      

  return !isloading ? (
    <>
    <Title text1="List" text2="Bookings"/>
    <div className='max-w-4xl mt-6 overflow-x-auto'>
      <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
        <thead>
          <tr className='bg-gradient-to-r from-blue-600 to-cyan-400 text-left text-white'>
            <th className='p-2 font-medium pl-5 '>User Name</th>
            <th className='p-2 font-medium '>Movie Name</th>
            <th className='p-2 font-medium'>Show Time</th>
            <th className='p-2 font-medium'>Seats</th>
            <th className='p-2 font-medium'>Amount</th>
          </tr>
        </thead>
         <tbody className='text-sm font-light'>
                  {bookings.map((item ,index)=>(
                    <tr key={index} className='border-b border-blue-500/10 bg-blue-500/5 even:bg-blue-500/10'>
                      <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                      <td className='p-2 min-w-45'>{item.show.movie.title}</td>
                      <td className='p-2'>{dateformat(item.show.showDateTime)}</td>
                      <td className='p-2'>{Object.keys(item.bookedSeats).map(seat=>item.bookedSeats[seat]).join(", ")}</td>
                      <td className='p-2'>{currency} {item.amount}</td>
        
                    </tr>
                  ))}
        
                </tbody>
        </table>
    </div>
    </>
  ): <Loading></Loading>
}

export default ListofBookings
