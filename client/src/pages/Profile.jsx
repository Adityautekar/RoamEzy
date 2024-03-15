import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/userContext.jsx'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from '../components/PlacesPage.jsx';
import AccountNav from '../components/AccountNav.jsx';

function Profile() {
    const {ready, user, setUser} = useContext(userContext);
    const id = user?._id;
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState(new Date())
    const [nationality, setNationality] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');

    useEffect(()=> {
        if(!user) return;
        setFullname(user?.fullname);
        setBirth(user?.birth?.toString().split('T')[0])
        setNationality(user?.nationality)
        setGender(user?.gender)
        setPhone(user?.phone)
        setUser(user)
    },[user]);
    
    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    let {subpage} = useParams();
    if (subpage === undefined) subpage = 'profile';

    
    if(!ready){
        return "Loading..."
    }
    if (ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

  return (
    <div className='w-full py-2 min-h-[360px] '>
        <AccountNav />
        {subpage==='profile' && (
            <div className='mt-8 mx-32 '> 
                <h1 className='text-4xl leading-4 font-semibold text-stone-800'>Account</h1>
                <div className='flex gap-x-2'>
                    <h2 className='text-xl font-semibold py-4 text-stone-800'>{fullname ? fullname.split(' ')[0] +" " + fullname?.split(' ')[2] : "Dear User"},</h2>
                    <Link to={"/account/user"} className='underline text-xl font-semibold py-4 text-stone-500'>go to Profile</Link>
                </div>
                <div >
                    {user?.nationality ? <h1>Nice to know you are <span className='font-semibold'>{nationality}</span></h1>:''}
                    {user?.birth ? <h1>Birth date <span className='font-semibold'>{ birth.toString().slice(0,10)}</span></h1>:''}
                    {user?.phone ? <h1>Phone Number <span className='font-semibold'>{ phone}</span></h1>:''}

                </div>
                
                <button onClick={logout} className='bg-gray-200 hover:bg-red-500 hover:text-white px-4 py-1 mt-5 rounded-full'>Logout</button>
            </div>
        )}
        
        {subpage === 'places' && (
            <PlacesPage/>
        )}
    </div>
  )
}

export default Profile