import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Ratings from '../components/Ratings.jsx';
import Reviews from '../components/Reviews.jsx';
import axios from 'axios';
import { toastNotification } from "../utils/Toast.jsx";
import {differenceInCalendarDays} from "date-fns";
import { userContext } from '../context/userContext.jsx';
function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState();
    const {user} = useContext(userContext);
    const [showAllphotos , setShowAllphotos] = useState(false);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate =  today.toISOString().split('T')[0];
    const formattedCheckOutDate = tomorrow.toISOString().split('T')[0];
    const [checkIn, setCheckIn] = useState(formattedDate);
    const [checkOut, setCheckOut] = useState(formattedCheckOutDate);
    const [noOfGuests, setNoOfGuests] = useState(2);
    const [wishlist, setWishlist] = useState(user?.wishlist ? user.wishlist : []);
    const [redirect, setRedirect] = useState('');
    const [owner, setOwner] = useState();
    const [liked, setLiked] = useState(user?.wishlist?.includes(id));
    const [ReviewsList, setReviewsList] = useState([]);
    let noOfNights = 1;
    // window.location.reload();
    // window.scrollTo(0, 0);
    useEffect(() => {
        if(!id){    
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data.place);
            setOwner(response.data.owner);
            
        });

        axios.get(`/placeReview/${id}`).then(response => {
            if(response.status === 200) {
                setReviewsList(response.data);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        });
        
    }, [id]);

     
    if(!place){
        return '';
    }

    if(showAllphotos){
        return (
            <div className='absolute bg-[#1b1b1b] min-w-full min-h-screen '>
                <div className='flex justify-between mx-20 mt-4'>
                    <h1 className='text-3xl ml-10 text-gray-200'>{place.title}, {place.address}</h1>
                    <button onClick={() => setShowAllphotos(false)} 
                        className='text-white text-lg  border-[1.5px] px-3 py-1 rounded-full'>
                        X</button>

                </div>
                
                {place?.photos?.length > 0 && place.photos.map(photo => (
                    <div className='mx-auto my-5 w-[50%] h-[50%]'
                     key={photo} >
                        <img src={photo} alt="" className='w-[100%] h-[60%] object-cover rounded-lg' />
                    </div>
                ))}
            </div>
        )
    }

    if(checkIn && checkOut ){
        noOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
        
    }

    async function bookThisPlace() {
        if(user){
            const data = {
                checkIn:checkIn.split('-').reverse().join('-'), checkOut:checkOut.split('-').reverse().join('-'), noOfGuests, place:place._id, noOfNights,
                price: place.price*noOfNights,
            };
            const response = await axios.post('/bookings', data);
            if(response.status === 200){
                toastNotification("SUCCESS", "Booking Confirmed")
                const bookingId = response.data._id;
                setRedirect(`/account/bookings/${bookingId}`);
            } else if(response.status === 205){
                toastNotification("ERROR", "Booking not Available")
            } else {
                toastNotification("ERROR", "Booking Failed")
            }
        } else {
            toastNotification("WARNING", "Please Login")
        }
        
        
    }

    async function likePlace(ev){
        ev.preventDefault();
        if(!user){
            toastNotification("WARNING", "Please Login")
        } else {
            const updatedWishlist = wishlist.includes(id) 
            ? wishlist.filter(wish => wish !== id) 
            : [...wishlist, id];
            
            const response = await axios.put("/wishlistplace", {wishlist: updatedWishlist});
            if(response.status === 200){
                setWishlist(updatedWishlist);
                setLiked(!wishlist?.includes(id)); // Toggle liked state based on whether the id is in wishlist
                toastNotification("SUCCESS", "Place Saved");
            } else {
                toastNotification("ERROR", "Something went wrong...");
            }
        }
        
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

  return (
    <div className='mx-20 my-4 px-28'>
        
        <div className="flex justify-between py-3">
            <h1 className='text-3xl font-semibold text-stone-700'>{place.title}</h1>
            <div className="flex px-5 justify-between space-x-2 items-center">
               <button className="border-2 border-stone-300 px-2 text-sm rounded-md " >Share</button>
               <button 
               onClick={likePlace} 
               className={`border-2 border-stone-300 px-2 text-sm rounded-md ${liked ? "bg-secondary text-white" : "bg-transparent"}`}>{liked ? "Saved":"Save"}
               </button>
           </div>
        </div>
        {place.photos.length > 0 && <div className="grid grid-cols-2 h-[370px] gap-x-2">
            <div >
                <img className="h-[370px] w-[582px] object-cover rounded-l-3xl" 
                    src={place.photos[0]} alt=""
                    onClick={() => setShowAllphotos(true)} />
            </div>
            <div className=" relative grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-1.5" >
                <div>
                    <img className="h-[183px] w-[287px] object-cover"  
                    src={place.photos[1]} alt="" 
                    onClick={() => setShowAllphotos(true)} />
                </div>
                <div>
                    <img className="h-[183px] w-[287px] object-cover rounded-tr-3xl" 
                    src={place.photos[2]} alt="" 
                    onClick={() => setShowAllphotos(true)} />
                </div>
                <div>
                    <img className="h-[181px] w-[287px] object-cover"
                    src={place.photos[3]} alt="" 
                    onClick={() => setShowAllphotos(true)} />
                </div>
                <div>
                    <img className=" h-[181px] w-[287px] object-cover rounded-br-3xl" 
                    src={place.photos[4]} alt="" 
                    onClick={() => setShowAllphotos(true)} />
                    <button onClick={() => setShowAllphotos(true)} className='absolute bottom-3 right-3 bg-stone-800/70 px-4 py-1 rounded-2xl text-white hover:bg-gray-200/80 hover:text-gray-800 ' >all photos</button>
                </div>
            </div>
        </div>}
        <div className="flex max-w-[1117px] justify-between">
                <div className="py-8 w-[600px]">
                    <div>
                        <i className="fi fi-sr-marker text-2xl mr-1"></i>
                        <a target="_blank" href={place?.location} className="text-left text-2xl font-semibold">{place.address}</a>
                        <ol className="flex space-x-3 text-stone-600">
                            <li>12 guests</li>
                            <li className="relative space-x-2" ><span className="absolute left-[-8px] bottom-1">.</span>5 bedrooms</li>
                            <li className="relative" ><span className="absolute left-[-8px] bottom-1">.</span>5 beds</li>
                            <li className="relative" ><span className="absolute left-[-8px] bottom-1">.</span>5 bathrooms</li>
                        </ol>
                    </div>
                    
                    <div className="flex justify-between px-6 py-4 mt-8 mb-6 rounded-xl border-2 border-stone-200">
                        
                        <div className="font-semibold w-[70px] leading-4 mt-2">Guest favourite</div>
                        <div className="leading-4 font-semibold w-auto text-left pl-6 mt-2 " >No experince like before.</div>
                        <div className="w-[100px] items-center text-left mt-2">
                            <div className="text-2xl font-semibold relative">{place.rating}<i class="fi fi-ss-star px-2 absolute top-1"></i></div>
                        </div>
                        <div className="content-center text-2xl px-2 mt-2 w-[100px] align-center border-l-2 border-stone-200 leading-4">
                            <div className="font-semibold"> 6 </div>
                            <span className="text-sm underline">reviews</span>
                            
                        </div>
                    </div>

                    {/* Host bar */}
                    <div className="flex content-center items-center pl-2">
                        <div ><img className="rounded-full h-12 w-12 object-cover" src={owner.avatar} alt="" /></div>
                        <div className="text-left mx-4 ">
                            <div className="font-semibold text-md">Hosted by {owner.fullname}</div>
                            <div className="text-stone-600 text-sm font-semibold">Ownership {owner.nationality} </div>
                        </div>
                    </div>
                     {/* Feature section */}
                    <div className="grid grid-rows-3 gap-y-4 py-7 pl-3 border-stone-200 border-y-2 my-6">
                        <div className="flex items-start">
                            <div className="rotate-90 px-2" >
                                <i className="fi fi-rs-key"></i>
                            </div>
                            <div className="text-left">
                                <h3>Great check-in experience </h3>
                                <span>100% of recent guests gave the checking process a 5-star rating.</span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2">
                            <i className="fi fi-rs-room-service"></i>
                            </div>
                            <div className="text-left">
                                <h3>Great check-in experience </h3>
                                <span>100% of recent guests gave the checking process a 5-star rating.</span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2">
                            <i className="fi fi-rs-star"></i>
                            </div>
                            <div className="text-left">
                                <h3>Great check-in experience </h3>
                                <span>100% of recent guests gave the checking process a 5-star rating.</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Description section */}
                    <div className="text-left heading-4 text-stone-800">
                        <h2 className='text-lg font-semibold'>About Place</h2>
                        <p>{place.extraInfo}
                        </p>  
                        <div className="w-auto flex text-stone-800 py-0.5 mt-2 font-semibold"><span className="underline">Show more</span> <div className="py-0.5 px-1 no-underline"><i class="fi fi-rr-angle-right text-xs"></i></div></div>
                    </div>
                    {/* Bedroom section view */}
                    <div className="border-stone-200 border-y-2 py-6">
                        <div className="flex justify-between w-full py-2">
                            <div><h1 className="text-2xl font-semibold">Where you'll sleep</h1></div>
                            <div className="grid grid-cols-3 gap-x-2">
                                <div className="flex items-center text-sm content-center">1/3</div>
                                <div className="flex items-center content-center"><button className="rounded-full border-2 px-2 border-stone-200"><i class="fi fi-rr-angle-left text-[10px]"></i></button></div>
                                <div className="flex items-center content-center"><button className="rounded-full border-2 px-2 border-stone-200"><i class="fi fi-rr-angle-right text-[10px]"></i></button></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 pb-6">
                            <div className="text-left">
                                <img className="rounded-xl my-2" src={place?.photos?.[4]} alt="" />
                                <div className="font-semibold text-md mt-4">Bedroom 1</div>
                                <div className="text-sm">1 king bed</div>
                                
                            </div>
                            <div className="text-left">
                                <img className="rounded-xl my-2" src={place?.photos?.[3]} alt="" />
                                <div className="font-semibold text-md mt-4">Bedroom 2</div>
                                <div className="text-sm">1 king bed, 1 floor mattress</div>
                            </div>
                        </div>
                    </div>
                    {/* Facilites offered */}
                    <div className=" pb-12 border-b-2 border-stone-200">
                        <h1 className="text-left text-2xl font-semibold mb-3 mt-8">What this place offers</h1>
                        <div className="grid grid-rows-4 grid-cols-2 text-left">
                            <div className="flex py-2">
                                <span><i className="fi fi-rs-flower-daffodil"></i></span>
                                <h2 className="text-md ml-4">Garden view</h2>
                            </div>
                            <div className="flex">
                                <span><i className="fi fi-rs-car"></i></span>
                                <h2 className="text-md ml-4">Free parking on premises</h2>
                            </div>
                            <div className="flex">
                                <span><i className="fi fi-rs-chair-office"></i></span>
                                <h2 className="text-md ml-4">Dedicated workspace</h2>
                            </div>
                            <div className="flex">
                                <span><i className="fi fi-rs-computer"></i></span>
                                <h2 className="text-md ml-4">42" T.V</h2>
                            </div>
                            <div className="flex">
                                <span><i className="fi fi-rs-paw"></i></span>
                                <h2 className="text-md ml-4">Pets Allowed</h2>
                            </div>
                            <div className="flex">
                                <span><i className="fi fi-rs-water"></i></span>
                                <h2 className="text-md ml-4">Private pool 24/7</h2>
                            </div>
                            <div className="flex">
                                <span><i className="fi fi-rs-air-conditioner"></i></span>
                                <h2 className="text-md ml-4">Air Conditioner</h2>
                            </div>
                            <div className="flex">
                                <span><i className="fi fi-rs-bath"></i></span>
                                <h2 className="text-md ml-4">Bath tub</h2>
                            </div>  
                        </div>
                        <div>
                            <button className="flex content-left border-2 border-stone-900/50 rounded-lg text-md font-semibold py-3 px-6 ">Show all amenities</button>
                        </div>
                    </div>
                    
                </div>
                


                {/* This is total card section */}
                <div className="w-[420px] my-14 justify-end flex">
                    <div className="w-[370px] h-[420px] sticky top-28 border-stone-300 shadow-lg shadow-stone-300 border-2 p-5 rounded-xl">
                        <div className="mb-3 text-left space-x-1 ">
                                <span className="font-semibold text-2xl">₹{place.price}</span>
                                <span className="text-md">night</span>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="grid grid-cols-2 text-left ">
                                <div className="px-3 py-1 rounded-tl-lg border-stone-400/70 border-2">
                                    <label className="text-[14px] font-semibold">CHECK-IN</label>
                                    <input type='date' className="text-md outline-none pl-1"
                                     value={checkIn}
                                     onChange={ev => setCheckIn(ev.target.value)} />
                                </div>
                                <div className="px-3 py-1 rounded-tr-lg border-stone-400/70 border-2 border-l-0">
                                    <label className="text-[14px] font-semibold">CHECK-OUT</label>
                                    <input type='date' className="text-md outline-none pl-1"
                                     value={checkOut}
                                     onChange={ev => setCheckOut(ev.target.value)} />
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-b-lg border-stone-400/70 border-2 border-t-0">
                                <div className=''>
                                    <label className="text-[14px] font-semibold">GUESTS</label>
                                </div>
                                <input type="number" className='pl-1' 
                                value={noOfGuests}
                                onChange={ev => setNoOfGuests(ev.target.value)} />
                            </div>
                            <button onClick={bookThisPlace}
                                className="bg-primary rounded-lg my-3.5 py-2.5 text-lg text-white"
                                >Continue</button>
                            <h2 className="text-stone-800 text-sm">You won't be charged yet</h2>
                            <div className="grid grid-rows-2 mt-5">
                                <div className="border-b-2 border-stone-400/70">
                                <div className="flex justify-between mb-5 ">
                                    <div className="underline text-stone-700 ">₹{place.price} x {noOfNights} nights</div>
                                    <div className="text-stone-700">₹{place.price*noOfNights}</div>
                                </div>
                                </div>
                                <div className="flex justify-between mt-5 ">
                                    <div className="font-semibold">Total before taxes</div>
                                    <div className="font-semibold">₹{place.price * noOfNights}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <Ratings rating={place.rating} />
            <Reviews reviewsList={ReviewsList}/>
        
    </div>
  )
}

export default PlacePage