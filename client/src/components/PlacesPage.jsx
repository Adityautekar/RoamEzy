import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import AccountNav from './AccountNav';
import axios from 'axios';

function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data)
        });
    }, [])
    


  return (
    <div className='w-full py-2 mx-auto ' >
        <AccountNav/>
        <div className='mx-32 my-2 pt-6 flex flex-col gap-y-4'>
            <h2 className='text-3xl mx-20 my-4 font-semibold text-stone-700'>All Listed Places</h2>
            {places.length > 0 && places.map(place => (
                <Link to={'/account/places/'+place._id} key={place._id} 
                    className='mx-20 p-2 shadow-md shadow-stone-300/50 bg-gray-200/20 rounded-xl
                     flex w-[65%] my-1 gap-x-4 h-auto'>
                        
                    <div className='rounded-lg bg-gray-600 w-[20%] h-28'>
                        {place.photos.length > 0 && (
                            <img src={place.photos[0]} alt="" className='rounded-lg object-cover h-full w-full ' />
                        )}
                    </div>
                    <div className='h-auto w-[70%]'>
                        <h2 className='text-lg font-semibold'>{place.title}</h2>
                        <p className='text-md py-0'>{place.description}</p>
                        <div className='py-0 flex text-sm font-semibold justify-between w-80'>
                            <p>Check In:{place.checkIn}</p>
                            <p>Check Out: {place.checkOut}</p>
                            <p>Max Guests : {place.maxGuests}</p>
                        </div>
                        
                    </div>
                 
                </Link>
            ))}
           
        </div>



        <div className='mx-52 my-8 text-left'>
        <Link className='bg-red-500 px-8 py-3 rounded-full text-white font-semibold '
         to={'/account/places/new'} >
           + Add new Places
        </Link>
        </div>
        
    </div>
  )
}

export default PlacesPage