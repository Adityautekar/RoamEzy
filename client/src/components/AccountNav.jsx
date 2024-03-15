import React from 'react'
import { Link, useLocation } from 'react-router-dom';
function AccountNav() {
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined) {
        subpage = 'profile'
    }
    function LinkClasses(type=null){
        let classses = 'px-4 py-1 ';
        if(type === subpage){
            classses += 'text-white bg-primary rounded-full';
        }
        return classses;
    }


  return (
    <>
        <nav className='h-10 w-auto flex justify-center items-center bg-gray-100'>
            <Link to={'/account'} 
              className={LinkClasses('profile')} 
                >Profile</Link>
            <Link to={'/account/bookings'} 
              className={LinkClasses('bookings')}  
               >Bookings</Link>
            <Link to={'/account/places'} 
              className={LinkClasses('places')}
              >My Places</Link>
            <Link to={'/account/wishlist'} 
              className={LinkClasses('wishlist')}
              >Wishlist</Link>

        </nav>
    </>
  )
}

export default AccountNav