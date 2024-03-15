import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../context/userContext'
import Footer from '../components/Footer'
function Contact() {

  const {user} = useContext(userContext)

  return (
    <div className='w-full h-auto min-h-screen'>
      {/* A Navbar */}
        <div className='bg-gray-100 h-20 flex items-center justify-between px-32'>
          <div className='flex items-center'>
            <Link to={"/"}><img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709968595/rbi3j3fqqodoz8aq3vot.png" alt="" 
              className='h-9'/>
              </Link>
            <h2 className='font-semibold text-xl'>Help Centre</h2>
          </div>
          <div className='flex'>
          <div
            // to="#"
            className="text-gray-00 flex items-center bg-gray-100 hover:bg-gray-200 
             p-3 font-medium rounded-3xl text-sm mr-2 focus:outline-none duration-400"
          >
              <i className="fi fi-rr-globe"></i>
            </div>
          <Link to={user?'/account':'/login'}
            className="text-white bg-gray-600 hover:shadow-md shadow-gray-900 
           rounded-full h-10 w-10 items-center justify-center focus:outline-none duration-400 flex"
          >
            {user?.avatar ? <img src={user?.avatar} alt="" className='h-10 w-10 rounded-full object-cover' />  : <i className="fi fi-sr-user"></i>}
              
          </Link>
          </div>
        </div>

        {/* BODY Page */}
        <div className='mx-56 mb-20'>
          <h1 className='text-5xl text-center font-semibold mt-8'>Hi,{user? user?.fullname.split(' ')[0]:""} How can we help?</h1>
          {/* Login for help */}
          {user? 
          <div className='flex justify-between items-center my-20'>
            <Link to={"/account/user"}
              className='text-xl px-2 font-semibold h-36 w-36 border-4 border-black hover:border-black opacity-50 hover:opacity-100  rounded-xl'>
              <div className='h-32 w-32 p-8 '>
              <img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709983066/tdrj1l92smcjzrls9bdq.png" alt="Personal" />
              </div>
              <h2 className='mt-3'>Personal Info</h2>
            </Link>
            <Link to={"/account/user"}
             className='text-xl px-2 font-semibold h-36 w-36 border-4 border-black hover:border-black opacity-50 hover:opacity-100  rounded-xl'>
              <div className='h-32 w-32 p-8'>
              <img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709983065/nhzqfbvmuflf4b94zi7d.png" alt="Security" />
              </div>
              <h2 className='mt-3'>Privacy and Security</h2>
            </Link>
            <Link to={"/account/bookings"}
              className='text-xl px-2 font-semibold h-36 w-36 border-4 border-black hover:border-black opacity-50 hover:opacity-100  rounded-xl'>
              <div className='h-32 w-32 p-8'>
              <img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709983065/gfqht0aofb0sfudbpmfe.png" alt="Bookings" />
              </div>
              <h2 className='mt-3'>Manage bookings</h2>
            </Link>
            <Link to={"/"}
              className='text-xl px-2 font-semibold h-36 w-36 border-4 border-black hover:border-black opacity-50 hover:opacity-100  rounded-xl'>
              <div className='h-32 w-32 p-8'>
              <img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709983065/m1aeudn58vkgt1axd3pi.png" alt="Search"  />
              </div>
              <h2 className='mt-3'>Find perfect Place</h2>
            </Link>
            <Link to={"/account/places"}
              className='text-xl px-2 font-semibold h-36 w-36 border-4 border-black hover:border-black opacity-50 hover:opacity-100  rounded-xl'>
              <div className='h-32 w-32 p-8'>
                <img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709983065/kqvui5lwlgesjkxhbaek.png"alt="Listings"/>
              </div>
              <h2 className='mt-3'>Listed Places</h2>
            </Link>
            <Link to={"/"}
              className='text-xl px-2 font-semibold h-36 w-36 border-4 border-black hover:border-black opacity-50 hover:opacity-100  rounded-xl'>
              <div className='h-32 w-32 p-8'>
                <img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709983065/xnxwtb39jdgcd8uxyvgp.png" alt="Reviews" />
              </div>
              <h2 className='mt-3'>Review Places</h2>
            </Link>
          </div> 
          : 
          <div className='flex p-3 px-4 my-6 rounded-2xl border-gray-300 border-2 justify-between mx-auto w-[70%]'>
            <div className='my-1 ml-1'>
              <h2 className='text-2xl font-semibold'>We're here for you</h2>
              <h2>Log in to get help with your reservations, account, and more.</h2>
            </div>
            <Link to={"/login"} className='bg-primary text-white flex items-center px-8 my-1 rounded-lg font-semibold'>
            <h2 >
              Log in or Sign up
            </h2>
            </Link>
          </div>}
          {/* Guides for Getting Started */}
          <h2 className='text-3xl font-semibold mt-28'>Guides for getting started</h2>
          <div className='my-2'>
            <div className='flex justify-start'>
              <img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709979361/d70nsk6bgmg6z9ibm8c1.jpg" alt="" 
              className='h-56 w-56 m-2 rounded-xl object-cover'/>
              <p className='my-4 ml-8 text-left'>
                <h2 className='text-xl font-semibold '>Step 1 : Log in and browse properties</h2>
                Begin your journey by logging in to our user-friendly platform.
                 Browse through our curated listings to discover the perfect accommodation for your needs.
                  With detailed descriptions and high-quality images, finding your ideal stay is just a few clicks away.
              </p>
            </div>

            <div className='flex justify-end'>
              <p className='my-4 mr-8 text-right'>
                <h2 className='text-xl font-semibold '>Step 2 : Book for your needs</h2>
                Once you've found the perfect place, easily book it to secure your reservation.
                 Customize your stay by selecting specific dates, room types, and amenities that suit your preferences.
                 Our streamlined booking process ensures a hassle-free experience from start to finish.
              </p>
              <img src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709979375/hzesrogazgskpmvxsudj.jpg" alt="" className='h-56 w-56 m-2 rounded-xl object-cover'/>
            </div>

            <div className='flex justify-start'>
              <img src="https://images.pexels.com/photos/3807332/pexels-photo-3807332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='h-56 w-56 m-2 rounded-xl object-cover'/>
              <p className='my-4 ml-8 text-left'>
                <h2 className='text-xl font-semibold '>Step 3 : Check In, Enjoy</h2>
                After booking, it's time to relax and look forward to your stay. 
                Check-in is a breeze with our seamless process. Simply arrive at your destination,
                 and our attentive hosts will welcome you warmly. From there, it's all about enjoying
                  your time and making unforgettable memories.


              </p>
            </div>
            
          </div>
        </div>
        
        <Footer/>
    </div>
  )
}

export default Contact