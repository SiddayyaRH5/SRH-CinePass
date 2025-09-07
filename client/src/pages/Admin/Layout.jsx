import React from 'react'
import AdminNavBar from '../../components/Admin/AdminNavBar'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <AdminNavBar />
      <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
        <Outlet /> 
      </div>
      </div>
    </div>
  )
}

export default Layout
