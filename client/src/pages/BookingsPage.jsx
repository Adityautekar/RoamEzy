import React, { useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav'
import axios from 'axios';
function BookingsPage() {
    const [bookings,setBookings] = useState([]);
    const today = new Date();
    const formattedDate =  today.toISOString().split('T')[0].split('-').reverse().join('-');
    // console.log(formattedDate);
    // const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });

    }, []);
    
    return (
    <div className='h-full py-2 w-full'>
        <AccountNav/>
        <div className='mx-44 my-12'>
            <h2 className='text-3xl font-semibold text-stone-700'>View Your Bookings</h2>
            {bookings?.length > 0 && bookings.map((booking, index) => (
                <Link to={`/account/bookings/${booking._id}`} key={index} className='flex items-center px-2 gap-x-3 
                    hover:shadow-lg hover:scale-105 transition ease-in-out shadow-stone-400 
                    rounded-xl w-[550px] h-[150px] my-3 border-2 border-stone-400/20'>
                    {booking.place.photos?.length > 0 && (
                        <img src={booking.place.photos[0]} alt="" className='w-[180px] h-[130px] object-cover rounded-lg'/>
                    )}
                    <div className='h-[130px] w-[320px]'>
                        <h1 className='text-lg leading-none pt-2 font-semibold text-stone-800'>{booking.place.title}</h1>
                        <h1>{booking.place.address}</h1>
                        <div className='flex justify-between text-sm'>
                            <h1>Check In : {booking.checkIn.toString().slice(0,10)}</h1>
                            <h1>Check Out : {booking.checkOut.toString().slice(0,10)}</h1>
                        </div>
                        <div className='flex justify-start space-x-6'>
                            <h3 className='text-sm'>Guests : {booking.noOfGuests}</h3>
                            <h3 className='text-sm'>Stay for : {booking.noOfNights} nights</h3>
                        </div>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-md font-semibold text-start mt-4'>
                                Total Price : {booking.price}
                            </h3>
                            <div className={`flex gap-x-2 text-sm font-semibold text-end mt-3
                                 ${booking.checkOut<formattedDate ?"block":"hidden" }`}>
                                <h1 className=' bg-stone-300/50 px-3 py-1 rounded-full '>
                                    Stayed
                                </h1>
                                <div className=' px-3 py-1 z-20 rounded-full
                                 bg-primary text-white'
                                 >
                                    Review
                                </div>
                            </div>
                            <div className={`text-sm bg-teal-500/80 px-3 py-1 rounded-full 
                                font-semibold text-end mt-4 ${booking.checkIn>formattedDate ?"block":"hidden" }`}>
                                <h1>To Stay</h1>
                            </div>
                        </div>
                        
                    </div>
                    
                </Link>
                
            ))}
        </div>
        
        
    </div>
    
  )
}

export default BookingsPage