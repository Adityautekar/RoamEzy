import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Reviews from '../components/Reviews.jsx'
import { Navigate, useParams } from 'react-router-dom'
import { toastNotification } from '../utils/Toast';
function BookedPlace() {
    const {id} = useParams();
    const [booking, setBooking] = useState();
    const [showAllphotos, setShowAllphotos] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const today = new Date();
    const formattedDate =  today.toISOString().split('T')[0];
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [modal, setModal] = useState(false);
    const [ReviewsList, setReviewsList] = useState(() => {
        const storedReviews = localStorage.getItem('ReviewsList');
        return storedReviews ? JSON.parse(storedReviews) : [];
    });
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id)
                if(foundBooking) {
                    setBooking(foundBooking);
                }
            });  
            axios.get(`/reviews/${id}`).then(response => {
                if(response.status === 200) {
                    setReviewsList(response.data);
                    localStorage.setItem('ReviewsList', JSON.stringify(response.data));
                } else {
                    console.error("Unexpected response status:", response.status);
                }
            })
            .catch(error => {
                console.error("Error fetching reviews:", error);
                toastNotification("Error", "Failed to fetch reviews");
            });
        }
    }, [id]);

    function togglemodal(ev){
        ev.preventDefault()
        setModal(!modal);
    }

    async function addReview(ev) {
        ev.preventDefault();
        if(!review || !rating){
            toastNotification("WARNING", "Required fields empty")
        } 
        const placeid = booking?.place;
        await axios.post("/review", {placeid, review, rating});  
        setRefresh(true);
    }

    async function deleteBooking(ev){
        ev.preventDefault();
        
        try {
            const response = await axios.delete('/deletebooking', {data: {id}});
            if(response){
                toastNotification("SUCCESS", "Booking Cancelled")
                setRedirect(true);
            } else {
                toastNotification("ERROR", "Cancellation Failed...")
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(redirect){
        return <Navigate to={"/account/bookings"} />
    }

    if(refresh){
        window.location.reload();
    }

    if(!booking) {
        return "";
    }
    if(showAllphotos){
        return (
            <div className='bg-[#1b1b1b] w-full h-full '>
                <div className='flex justify-between mx-20 mt-4'>
                    <h1 className='text-3xl ml-10 text-gray-200'>{booking.place.title}, {booking.place.address}</h1>
                    <button onClick={() => setShowAllphotos(false)} 
                        className='text-white text-lg  border-[1.5px] px-3 py-1 rounded-full'>
                        X</button>
                </div>          
                {booking.place?.photos?.length > 0 && booking.place.photos.map(photo => (
                    <div className='mx-auto my-5 w-[50%] h-[50%]'
                     key={photo} >
                        <img src={photo} alt="" className='w-[100%] h-[60%] object-cover rounded-lg' />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='mx-20 my-4 px-28'>
            <div className="flex justify-between py-3">
                <h1 className='text-3xl font-semibold text-stone-700'>{booking.place.title}</h1>
                <div className="flex px-5 justify-between space-x-2 items-center">
                    <button className="border-2 border-stone-300 px-2 text-sm rounded-md" >Share</button>
                    <button className="border-2 border-stone-300 px-2 text-sm rounded-md">Save</button>
                </div>
            </div>
            {booking.place.photos.length > 0 && 
            <div className="grid grid-cols-2 h-[370px] gap-x-2">
                <div >
                    <img className="h-[370px] w-[582px] object-cover rounded-l-3xl" 
                        src={booking.place.photos[0]} alt=""
                        onClick={() => setShowAllphotos(true)} />
                </div>
                <div className=" relative grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-1.5" >
                    <div>
                        <img className="h-[183px] w-[287px] object-cover"  
                        src={booking.place.photos[1]} alt="" 
                        onClick={() => setShowAllphotos(true)} />
                    </div>
                    <div>
                        <img className="h-[183px] w-[287px] object-cover rounded-tr-3xl" 
                        src={booking.place.photos[2]} alt="" 
                        onClick={() => setShowAllphotos(true)} />
                    </div>
                    <div>
                        <img className="h-[181px] w-[287px] object-cover"
                        src={booking.place.photos[3]} alt="" 
                        onClick={() => setShowAllphotos(true)} />
                    </div>
                    <div>
                        <img className=" h-[181px] w-[287px] object-cover rounded-br-3xl" 
                        src={booking.place.photos[4]} alt="" 
                        onClick={() => setShowAllphotos(true)} />
                        <button onClick={() => setShowAllphotos(true)} className='absolute bottom-3 right-3 bg-stone-800/70 px-4 py-1 rounded-2xl text-white hover:bg-gray-200/80 hover:text-gray-800 ' >all photos</button>
                    </div>
                </div>     
            </div>}
            <div className="flex max-w-[1117px] justify-between">
                <div className='py-8 w-[600px]'>
                    <div>
                        <a target="_blank" href={"https://maps.google.com/?q=" + booking.place.address} className="text-left text-2xl font-semibold">{booking.place.address}</a>
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
                            <div className="text-2xl font-semibold relative">{booking.place.rating}<i class="fi fi-ss-star px-2 absolute top-1"></i></div>
                        </div>
                        <div className="content-center text-2xl px-2 mt-2 w-[100px] align-center border-l-2 border-stone-200 leading-4">
                            <div className="font-semibold"> 6 </div>
                            <span className="text-sm underline">reviews</span>
                        </div>
                    </div>
                    <div className="flex content-center items-center pl-2">
                        <div ><img className="rounded-full h-12 w-12 object-cover" src={booking.user.avatar} alt="" /></div>
                        <div className="text-left mx-4 ">
                            <div className="font-semibold text-md">Hosted by {booking.user.fullname}</div>
                            <div className="text-stone-600 text-sm font-semibold">Ownership {booking.user.nationality}</div>
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
                                <span>100% of recent guests gave the checking process a  <br/>5-star rating.</span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2">
                            <i className="fi fi-rs-room-service"></i>
                            </div>
                            <div className="text-left">
                                <h3>Great check-in experience </h3>
                                <span>100% of recent guests gave the checking process a  <br/>5-star rating.</span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2">
                            <i className="fi fi-rs-star"></i>
                            </div>
                            <div className="text-left">
                                <h3>Great check-in experience </h3>
                                <span>100% of recent guests gave the checking process a  <br/>5-star rating.</span>
                            </div>
                        </div>
                    </div>
                    {/* Description section */}
                    <div className="text-left heading-4 text-stone-800">
                        <h2 className='text-lg font-semibold'>About Place</h2>
                        <p>{booking.place.extraInfo}
                        </p>  
                        <div className="w-auto flex text-stone-800 py-0.5 mt-2 font-semibold"><span className="underline">Show more</span> <div className="py-0.5 px-1 no-underline"><i class="fi fi-rr-angle-right text-xs"></i></div></div>
                    </div>
                </div>

                {/* This is total card section */}
                <div className="w-[320px] my-14 ml-40 flex justify-end ">
                    <div className="w-[300px] h-[324px] sticky top-28 border-stone-300 shadow-lg shadow-stone-300 border-2 p-5 rounded-xl">
                        <div className="mb-3 text-left space-x-1 ">
                            <span className="font-semibold text-2xl">₹{booking.place.price}</span>
                            <span className="text-md">night</span>
                        </div>
                        <div className="">
                            <div className="grid grid-cols-2 text-left ">
                                <div className="px-3 py-1 rounded-tl-lg border-stone-400/70 border-2">
                                    <label className="text-sm font-semibold">CHECK-IN</label>
                                    <h2 className="text-md outline-none pl-1"
                                     >{booking.checkIn.toString().slice(0,10)}
                                     </h2>
                                </div>
                                <div className="px-3 py-1 rounded-tr-lg border-stone-400/70 border-2 border-l-0">
                                <label className="text-sm font-semibold">CHECK-OUT</label>
                                    <h2 className="text-md outline-none pl-1"
                                     >{booking.checkOut.toString().slice(0,10)}
                                    </h2>
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-b-lg border-stone-400/70 border-2 border-t-0">
                                <div className=''>
                                    <label className="text-[14px] font-semibold">GUESTS</label>
                                </div>
                                <h2 className='pl-1 '>  
                                {booking.noOfGuests}</h2>
                            </div>
                        
                            <h2 className="text-stone-800 text-sm">Your total Booking Cost.</h2>
                            <div className="mt-2">
                                <div className="border-b-2 border-stone-400/70">
                                <div className="flex justify-between mb-2 ">
                                    <div className="underline text-stone-700 ">₹{booking.place.price} x {booking.noOfNights} nights</div>
                                    <div className="text-stone-700">₹{booking.place.price*booking.noOfNights}</div>
                                </div>
                                </div>
                                <div className="flex justify-between mt-2 ">
                                    <div className="font-semibold">Total before taxes</div>
                                    <div className="font-semibold">₹{booking.place.price * booking.noOfNights}</div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 mb-2 gap-x-2'>
                            {booking?.checkOut<formattedDate? 
                                <button onClick={togglemodal} className='bg-primary text-white font-semibold rounded-md py-1 mt-1'>
                                Review
                                </button>: 
                                <button onClick={deleteBooking} className='bg-red-500 text-white font-semibold rounded-md py-1 mt-1'>
                                Cancel
                                </button>
                            }
                            <button className='bg-stone-300 font-semibold rounded-md py-1 mt-1'>Share</button>
                        </div>
                    </div>   
                </div>
            </div>
            <Reviews reviewsList={ReviewsList} />
            {/* REVIEW MODAL */}
            {modal && 
            <div 
            className='w-full fixed z-50 h-full top-0 -left-0 bg-stone-900/70 backdrop-blur-sm flex justify-center py-24 '>
            <div className='z-20 w-[40%] h-[100%] bg-white rounded-xl p-2 '>
                <div className='flex justify-end items-center py-4 '>
                    <div className='mr-6 px-2 right-4 cursor-pointer hover:bg-stone-200 rounded-full' onClick={togglemodal}>X</div>
                </div>
                <div className='flex mx-12 flex-col justify-between '>
                    <label className='text-2xl font-semibold '>Write a review.</label>
                    <p className='text-stone-500 text-sm mb-4 leading-4'>
                        Provide constructive feedback to help others make informed decisions about their experience.
                    </p>
                    <textarea className='py-2 resize-none h-28 px-4 border-2 border-stone-400 outline-stone-400 rounded-lg' 
                     value={review} onChange={(ev) => setReview(ev.target.value)} />
                    <label className='text-2xl font-semibold mt-8'>Give this place a rating.</label>
                    <p className='text-stone-500 text-sm mb-4 leading-4'>Rating provides an overview of your experience.</p>
                    <input className='py-2 px-4 border-2 mb-8 border-stone-400 outline-stone-400 rounded-lg' 
                       value={rating} onChange={(ev) => setRating(ev.target.value)} type="Number"/>
                    
                    <button className='bg-primary py-3 rounded-md text-xl text-center font-semibold text-white'
                       onClick={addReview} >
                        Post Review
                    </button>
                </div>       
            </div>
            </div>
        }
    </div>
    )
}

export default BookedPlace