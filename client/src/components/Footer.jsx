import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
      <footer className="px-6 mt-40  md:px-16 lg:px-36 w-full text-gray-300">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
          <div className="md:max-w-96">
            <img alt="" class="h-11" src={assets.logo} className="w-40 md:w-75 h-auto"/>
            <p className="mt-6 text-sm">
              Book your favorite movies, shows, and events in just a few taps. 
              SRH CinePass brings you seamless ticket booking, exclusive offers, 
              and the ultimate cinema experience — all in one app.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <img src={assets.googlePlay} alt="google play" className="h-9 w-auto " />
              <img src={assets.appStore} alt="app store" className="h-9 w-auto " />
            </div>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
            <div>
              <h2 className="font-semibold mb-5">Company</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-5">Get in Touch</h2>
              <div className="text-sm space-y-2">
                <p>+91-80882-85205</p>
                <p>Siddusrh@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-sm pb-5">
          Copyright {new Date().getFullYear()} © SRH CinePass. All Right Reserved.
        </p>
      </footer>
  )
}

export default Footer