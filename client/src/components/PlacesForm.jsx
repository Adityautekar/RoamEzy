import React, { useEffect } from 'react'
import Features from './Features.jsx';
import { useState } from 'react';
import axios from 'axios'
import AccountNav from './AccountNav.jsx';
import { Navigate, useParams } from 'react-router-dom';
import {toastNotification} from  "../utils/Toast.jsx"
import '../index.css'

function PlacesForm() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [location, setLocation] = useState('');
    const [maxGuests, setMaxGuests] = useState(2);
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [cancellation, setCancellation] = useState("No");

    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        if(!id) return;
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            // console.log(data);
            setAddress(data?.place?.address);
            setTitle(data?.place?.title);
            setDescription(data?.place?.description);
            setMaxGuests(data?.place?.maxGuests);
            setCheckIn(data?.place?.checkIn);
            setCheckOut(data?.place?.checkOut);
            setAddedPhotos(data?.place?.photos);
            setPrice(data?.place?.price);
            setLocation(data?.place?.location);
            setCancellation(data?.place?.cancellation);
            setExtraInfo(data?.place?.extraInfo);
            setSelectedCategories(data?.place?.category);
            setFeatures(data?.place?.features);
        });
    }, [id]);

    const toggleCategoriesDropdown = () => {
        setShowCategories(!showCategories);
    };

    const addCategory = (category) => {
        setSelectedCategories([...selectedCategories, category]);
    };
    const removeCategory = (category) => {
        setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    }

    async function uploadPhoto(ev) {
        ev.preventDefault();
        setLoading(true);
        const files = ev.target.files;
        const formdata = new FormData();
        for(let i=0;i<files.length;i++){
            formdata.append('photos', files[i]);
        }
        try {
            const response = await axios.post('/upload', formdata, {
                headers: { 'Content-type': 'multipart/form-data' }
            });
            toastNotification("SUCCESS", "Photo uploaded");
            setAddedPhotos(prev => [...prev, response.data]);
        } catch (error) {
            toastNotification("ERROR", "Upload Failed...");
        } finally {
            setLoading(false); 
        }
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description,price, features,checkIn,
            checkOut, maxGuests , selectedCategories, cancellation, extraInfo, location
        };
        if (id) {
            const updatedPlace = await axios.put('/places', {
                id, ...placeData
            });
            if(updatedPlace){
                toastNotification("SUCCESS", "Place Updated!");
                setRedirect(true);
            } else{
                toastNotification("ERROR", "Update Failed....")
            }        
        } else{
            const added = await axios.post('/places',placeData);
            if (added){
                toastNotification("SUCCESS", "Place Listed!")
                setRedirect(true);
            } else{
                toastNotification("ERROR", "Failed Listing...") 
            }
                      
        }
        
    }
    async function deletePhoto(index){
        // ev.preventDefault();
        const photoid = addedPhotos[index];
        const response = await axios.delete("/deletePhoto", {data :{photoid, placeid:id}})
        if(response){
            toastNotification("SUCCESS", "Photo Deleted")
            setAddedPhotos(addedPhotos.filter(photo => photo!==photoid))
        } else {
            toastNotification("ERROR" ,"Failed...")
        }
    }
    // Method to delete Place
    async function deletePlace(ev){
        ev.preventDefault();
        const isDeleted = await axios.delete('/deletePlace', {data:{id}});
        if(isDeleted){
            toastNotification("SUCCESS", "Place Deleted!");
            setRedirect(true);
        } else toastNotification("ERROR", "Delete Failed!");
    }

    if(redirect) {
        return <Navigate to={'/account/places'} />
    }

  return (
    <div className='w-full min-h-screen mx-auto py-2 relative'>  
        <AccountNav/>
        {loading && 
        <div className='absolute w-full min-h-screen -top-24 flex items-center justify-center z-30 '>
            <div className="loader"></div>
        </div>
            }
        <div className='mx-32 my-4 h-auto'>
        
        <form onSubmit={savePlace}
            className='w-auto grid grid-cols-2 gap-x-12 py-2'>
            <div className='w-full h-auto'>
                {/* Add Title */}
                <h2 className='text-xl px-1 font-semibold' >Add title to your place</h2>
                <input type="text" required placeholder='Title of my House/Property...'
                    value={title}
                    onChange={ev => {setTitle(ev.target.value)} } 
                    className='px-4 py-1 border-[1.5px] border-gray-400 rounded-full w-full mb-2' />
                {/* Add Address */}
                <h2 className='text-xl font-semibold px-1'>Address</h2>
                <input type="text" required placeholder='address'
                    value={address}
                    onChange={ev => {setAddress(ev.target.value)}}
                    className='px-4 py-1 border-[1.5px] border-gray-400 rounded-full w-full mb-2'/>
                {/* Add Description */}
                <h2 className='text-xl font-semibold px-1'>Description</h2>
                <textarea placeholder='This is not just a Room but, a Breathtaking experience of home-stay!'
                    value={description}
                    onChange={ev => {setDescription(ev.target.value)}}
                 className='w-full rounded-full py-1 px-4 border-[1.5px] mb-1 border-gray-400 h-14 resize-none'
                ></textarea>
                {/* Add Photos */}
                <h2 className='text-xl font-semibold px-1'>Add Photos</h2>
                <div className='flex justify-start  '>
                    {addedPhotos?.length > 0 && addedPhotos.map((link,index) => (
                        <div key={index} className='mx-1 relative min-w-22 rounded-lg border-[1.5px] border-gray-400'>
                            <img src={link} className="object-cover rounded-lg h-24 w-24"  alt="Add More Photos" />
                            <i className="fi fi-rs-trash absolute right-1 bottom-0.5 px-1 pt-0.5 rounded-full hover:bg-stone-100/50"
                               onClick={() => deletePhoto(index)} ></i>
                        </div>
                    ))}
                    <label 
                        className='bg-transparent cursor-pointer text-lg font-semibold 
                        items-center h-24 w-24 justify-center flex px-4 border-[1.5px] border-gray-400 rounded-2xl'>
                            <input type="file" multiple className='hidden'
                            onChange={uploadPhoto} 
                            />
                            +Upload
                    </label>
                </div>
            </div>
            <div className='w-full h-auto'>
                {/* Category */}
                <div className='mt-2 relative'>
                    <label className='text-xl font-semibold' htmlFor="categories">Category</label>
                    <div 
                        className='cursor-pointer items-center flex flex-wrap justify-start border-[1.5px] border-gray-400
                         pr-6 pl-4 py-1 min-h-10 gap-x-2 gap-y-2 rounded-full'>
                        <div className='cursor-pointer pt-1' onClick={toggleCategoriesDropdown}><i className="fi fi-rs-angle-small-down text-2xl"></i></div>
                        
                        {selectedCategories?.length>0 && selectedCategories?.map((cat, index) => (
                            <div key={index} className='bg-gray-200 z-10 rounded-full px-4 py-1 items-center flex justify-center'>
                                {cat}
                                <div className='z-10 cursor-pointer font-semibold ml-2' onClick={() => removeCategory(cat)}>x</div>
                                </div>
                        ))}
                    </div>
                    {showCategories && (
                        <ul className='z-10 w-full relatives absolute mt-1 rounded-xl bg-gray-200'>
                            <li onClick={() => addCategory("Amazing Pool")}
                                className=' px-8 cursor-pointer rounded-t-xl hover:bg-primary hover:text-white'>
                                    Amazing Pool</li>
                            <li onClick={() => addCategory("Luxury")}
                                className='px-8 cursor-pointer hover:bg-primary hover:text-white'>
                                    Luxury</li>
                            <li onClick={() => addCategory("Green Lawns")}
                                className='px-8 cursor-pointer hover:bg-primary hover:text-white'>
                                    Green Lawns</li>
                            <li onClick={() => addCategory("Beautiful View")}
                                className='px-8 cursor-pointer hover:bg-primary hover:text-white'>
                                    Beautiful View</li>
                            <li onClick={() => addCategory("Countryside")}
                                className='px-8 cursor-pointer rounded-b-xl hover:bg-primary hover:text-white'>
                                    Countryside</li>
                        </ul>
                    )}
                </div>
                {/* Add Features */}
                <Features selected={features} onChange={setFeatures}></Features>
                <h2 className='text-xl font-semibold'>Extra Information</h2>
                <textarea placeholder='Xperia Mall within 15 mins, Hospital in 15 mins ... '
                value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)}
                className='outline-none w-full h-14 rounded-full border-[1.5px] border-gray-400 py-1 px-4 resize-none'/>
                {/* Home Rules */}
                <div className='grid grid-cols-4 mt-1 gap-x-1 '>
                    <label >
                        <span className='font-semibold text-xl'>Check-In</span>
                        <input type="text" 
                        value={checkIn} required
                        onChange={ev => {setCheckIn(ev.target.value)}}
                        className='border-[1.5px] w-28 border-gray-400 py-1 px-4 rounded-full' />
                    </label>
                    <label>
                        <span className='font-semibold text-xl'>Check-Out</span>
                        <input type="text" 
                        value={checkOut} required
                        onChange={ev => {setCheckOut(ev.target.value)}}
                        className='border-[1.5px] w-28 border-gray-400 py-1 px-4 rounded-full' />
                    </label>
                    <label >
                        <span className='font-semibold text-xl'>Max Guests</span>
                        <input type="Number" 
                        value={maxGuests}
                        onChange={ev => {setMaxGuests(ev.target.value)}}
                        className='border-[1.5px] w-28 border-gray-400 py-1 px-4 rounded-full'/>
                    </label>
                    <label >
                        <span className='font-semibold text-xl'>Price/Night</span>
                        <input type="Number" 
                        value={price} required
                        onChange={ev => {setPrice(ev.target.value)}}
                        className='border-[1.5px] w-28 border-gray-400 py-1 px-4 rounded-full'/>
                    </label>
                </div>
                <div className='flex justify-start items-center mt-3'>
                    <h2 className='text-lg font-semibold mr-4'>Is cancellation available?</h2>
                    <label className='px-8 text-lg'>
                        <input type="radio" value="Yes" 
                        name="cancellation"
                        checked={cancellation==="Yes"} 
                        onChange={(ev) => setCancellation(ev.target.value)}
                        className='mx-2 ' />
                        Yes
                    </label>
                    <label className='px-8 text-lg'>
                        <input type="radio" value="No" 
                        checked={cancellation==="No"}
                        name="cancellation" 
                        onChange={(ev) => setCancellation(ev.target.value)}
                        className='mx-2' />
                        No
                    </label>
                </div>
                
            </div>
            
            <div className='h-auto '>
                <h2 className='text-xl px-1 mt-2 font-semibold' >Add Location</h2>
                <input type="text" placeholder='Title of my House/Property...'
                    value={location}
                    onChange={ev => {setLocation(ev.target.value)} } 
                    className='px-4 py-1 border-[1.5px] border-gray-400 rounded-full w-full mb-2' />
            </div>
            {/* Form Controls */}
            <div className='display flex justify-between gap-x-2'>
                <button type='submit' className='text-center mt-3 mb-[0.5px] px-8 w-full
                 bg-red-500 rounded-lg text-white text-md font-semibold'>Save</button>
                <button className='text-center mt-3 mb-[0.5px] px-8 
                w-40 border-2 border-stone-500 bg-transparent rounded-lg
                 text-stone-800 text-md font-semibold'
                 onClick={deletePlace}>Delete</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default PlacesForm