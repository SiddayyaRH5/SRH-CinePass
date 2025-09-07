import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import SeatLayout from './pages/SeatLayout'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Layout from './pages/Admin/Layout'
import Dashboard from './pages/Admin/Dashboard' 
import ListShows from './pages/Admin/ListShows'
import ListofBookings from './pages/Admin/ListofBookings'
import AddShows from './pages/Admin/AddShows'


const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
      <Toaster position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "#22c55e", // green-500
              color: "white",
              fontWeight: "600",
            },
          },
          error: {
            style: {
              background: "#ef4444", // red-500
              color: "white",
              fontWeight: "600",
            },
          },
          loading: {
            style: {
              background: "#0ea5e9", // cyan-500
              color: "white",
            },
          },
          // default
          style: {
            borderRadius: "10px",
            background: "white", // gray-800
            color: "#2563EB",
            fontWeight: "bold",
            fontSize: "20px",
            padding: "12px 16px",
          },
        }} />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/My-Bookings" element={<MyBookings />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path='/admin/*' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='list-shows' element={<ListShows />} />
        <Route path='list-bookings' element={<ListofBookings />} />
        <Route path='add-shows' element={<AddShows />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
