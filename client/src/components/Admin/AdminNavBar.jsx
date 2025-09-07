import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavBar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 mt-5 
    border-b border-blue-300/30'>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className='w-66 h-auto' />
      </Link>
    </div>
  )
}

export default AdminNavBar
