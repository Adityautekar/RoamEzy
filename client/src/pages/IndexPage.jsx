import React, { useEffect, useState , useContext} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { searchContext } from '../context/searchContext';
function IndexPage() {
  const [places, setPlaces]  = useState([]);
  const { ready} = useContext(searchContext);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if(ready?.length>0){
      setPlaces(ready)
    } else {
      axios.get('/places').then(response => {
      setPlaces(response.data);
    });
    }
  }, [ready])


  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 mx-20 mt-4 mb-20'>
      {places?.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} key={place._id}
          className='hover:shadow-lg hover:z-5 hover:scale-105 transition ease-in-out shadow-stone-400 w-[315px] h-[350px] rounded-xl p-2 text-left'
        >
          {place?.photos?.length > 0 && (
            <img src={place?.photos[0]} alt="" className='h-[250px] w-[315px] relative object-cover rounded-md'></img>
            
          )}
          <i className={`fi fi-sr-heart absolute top-5 right-5 text-xl ${liked ?"text-red-500":"text-stone-800/60"} `}
            ></i>
          <div className='flex justify-between '>
            <h2 className='font-semibold '>{place.title}</h2>
            <div className='flex mr-2'>
              <h2 className='font-semibold'>{place.rating}</h2>
              <i className="fi fi-ss-star text-yellow-600 pt-0.5 ml-1"></i>
            </div>
            
          </div>
          <div>
            <h3 className='text-sm'>{place.address}</h3>
            <h3 className='text-sm'>350 km</h3>
          </div>
          <h3 className='font-semibold text-gray-600'>₹{place.price} night</h3>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage