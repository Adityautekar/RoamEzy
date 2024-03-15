import React, { useContext , useState, useEffect} from 'react'
import AccountNav from './AccountNav'
import { Link } from 'react-router-dom';
import axios from 'axios';
function WishlistPage() {

  const [wished, setWished] = useState([]);
  useEffect(() => {
    axios.get('/user-wishlist').then(({data}) => {
        setWished(data)
    });
    }, [])

    
  return (
    <div className='w-full py-2 mx-auto ' >
        <AccountNav/>
        <h2 className='text-2xl mx-32 my-4 font-semibold text-stone-700'>Your Wishlist</h2>
        <div className='mx-20 my-4 flex flex-wrap gap-8 justify-center'>
            
            {wished.length>0 && wished.map((wish, index) => (
              <Link key={index} to={`/place/${wish._id}`}
                className='h-72 w-72 flex flex-col bg-stone-100/50 rounded-2xl p-3 items-start
                 hover:scale-105 transition ease-in-out hover:shadow-md shadow-stone-300 '>
                  <img src={wish?.photos[0]} alt="" className='h-[80%] w-[100%] rounded-xl object-cover' />
                <h2 className='font-semibold text-stone-700 mt-1'>{wish.title}</h2>
                <h2 className='leading-2'>{wish.address}</h2>
              </Link>
            )) }
        </div>
    </div>
  )
}

export default WishlistPage