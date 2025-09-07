import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  const navLinkClasses = ({ isActive }) =>
    `relative transition-all duration-300 
    hover:text-cyan-400
    ${isActive ? 'text-cyan-400 font-semibold' : 'text-white'}
  `;

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center 
        justify-between p-6 mid:px-16 lg:px-36 py-5'>
      <NavLink to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="w-40 md:w-75 h-auto" />
      </NavLink>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0
            max-md:font-medium max-md:text-lg z-50 flex flex-col
            md:flex-row items-center max-md:justify-center gap-8
            min-md:px-8 py-3 max-md:h-screen min-md:rounded-full
            backdrop-blur bg-black/70 md:bg-white/10 md:border
            border-gray-300/20 overflow-hidden transition-[width]
            duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer '
          onClick={() => setIsOpen(false)} />

        <NavLink onClick={() => { scrollTo(0, 0); setIsOpen(false); }} 
          to='/' className={navLinkClasses}>Home</NavLink>
        <NavLink onClick={() => { scrollTo(0, 0); setIsOpen(false); }} 
          to='/movies' className={navLinkClasses}>Movies</NavLink>
        <NavLink onClick={() => { scrollTo(0, 0); setIsOpen(false); }} 
          to='/theaters' className={navLinkClasses}>Theaters</NavLink>
        <NavLink onClick={() => { scrollTo(0, 0); setIsOpen(false); }} 
          to='/releases' className={navLinkClasses}>Releases</NavLink>
        <NavLink onClick={() => { scrollTo(0, 0); setIsOpen(false); }} 
          to='/favorite' className={navLinkClasses}>Favorites</NavLink>
      </div>

      <div className='flex items-center gap-8'>
        <SearchIcon className='mx-md:hidden w-6 h-6 cursor-pointer' />
        {
          !user ? (
            <button onClick={() => openSignIn()} className='px-4 py-1 sm:px-7 sm:py-2 
                bg-gradient-to-r from-blue-600 to-cyan-400 
                hover:from-blue-700 hover:to-cyan-500 
                transition rounded-full font-medium cursor-pointer'>Login</button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action 
                  label="My Bookings"
                  labelIcon={<TicketPlus width={15} />}
                  onClick={() => navigate('/My-bookings')}
                />
              </UserButton.MenuItems>
            </UserButton>
          )
        }
      </div>

      <MenuIcon className='mx-md:ml-4 md:hidden w-8 h-8 cursor-pointer' 
        onClick={() => setIsOpen(!isOpen)} />
    </div>
  )
}

export default Navbar
