import React, {useContext, useEffect, useState } from 'react'
import { userContext } from '../context/userContext.jsx' 
import axios from 'axios';
import { toastNotification } from '../utils/Toast.jsx';
import { Navigate } from 'react-router-dom';
import '../index.css'
function UserProfile() {
    const {ready, user, setUser} = useContext(userContext);
    const id = user?._id;
    const [redirect, setRedirect] = useState(false)
    // const [refresh, setRefresh] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState(new Date())
    const [nationality, setNationality] = useState('');
    const [phone, setPhone] = useState('');
    const [popModal, setPopModal] = useState(false);
    const [popModal2, setPopModal2] = useState(false);
    const [newpass, setnewPass] = useState('');
    const [cnfnewPass, setCnfnewPass] = useState('');
    const [newUsername, setnewUsername] = useState('');
    const [newemail, setnewEmail] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(()=> {
        if(!user) return;
        setFullname(user?.fullname);
        setBirth(user?.birth?.toString().split('T')[0])
        setNationality(user?.nationality)
        setGender(user?.gender)
        setPhone(user?.phone)
        setAvatar(user.avatar)
        setUser(user)
    },[user]);
    

    function togglePop(ev){
        ev.preventDefault()
        setPopModal(!popModal);
    }

    function togglePop2(ev){
        ev.preventDefault()
        setPopModal2(!popModal2);
    }

    async function uploadAvatar(ev){
        ev.preventDefault();
        setLoading(true);
        const files = ev.target.files;
        // console.log(files)
        if(!files){console.log("Local File not Found...")}
        const formdata = new FormData();
        for(let i=0;i<files.length;i++){
            formdata.append("avatar", files[i]);
        }
        const cloudurl = await axios.post('/uploadAvatar', formdata, {
            headers : {'Content-type':'multipart/form-data'}
        })
        if(cloudurl){
            toastNotification("SUCCESS", "Photo uploaded")
        } else {
            toastNotification("ERROR", "Upload Failed...")
        }
        // console.log(cloudurl.data);
        setAvatar(cloudurl.data);
        setLoading(false);
        // window.location.reload();
        // window.scrollTo(0, 0);
    }
    
    async function updatePassword(ev) {
        ev.preventDefault();
        if(newpass!==cnfnewPass){
            toastNotification("WARNING", "Passwords don't match");
        } else {
            const updatedPass = await axios.put('/newpass', {id, newpass});
            if(updatedPass){
                toastNotification("Success", "Password Updated")
                setPopModal(false);
                window.location.reload();
                window.scrollTo(0, 0);
            }
        }
    }

    async function updateCredentials(ev){
        ev.preventDefault();
        if(user?.email===newemail || user?.username === newUsername){
            toastNotification("WARNING", "Credentials already in use")
        } else if(newemail === '' && newUsername === ''){
            toastNotification("WARNING", "Enter new credentials")
        } else{
            const updated = await axios.put('/credentials', {id, newemail, newUsername});
            if(updated.status === 200) {
                toastNotification("SUCCESS","Credentials Updated");
                setnewEmail('');
                setnewUsername('');
                setPopModal2(false);
                window.scrollTo(0, 0);
            } else {
                toastNotification("Error", "Update Failed...")
            }
        }
    }

    async function saveUser(ev) {
        ev.preventDefault();
        const profileData = {
            fullname, gender, birth, nationality, phone, avatar
        }
        const updatedProfile = await axios.put('/profile', {id, ...profileData});
        if(updatedProfile) toastNotification("SUCCESS", "Profile Updated")
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={"/account"}/>
        
    }

  return (
    <form onSubmit={saveUser}
        className='w-full min-h-screen relative py-14 flex gap-x-8'>
        {/* LEFT DIV */}
        {loading && 
        <div className='fixed w-full h-full -top-4 flex items-center justify-center z-30 '>
            <div className="loader"></div>
        </div>
            }
        <div className='w-[25%] ml-44 '>
            <div className='flex flex-col py-6 w-full items-center 
                justify-center shadow-lg shadow-stone-300/70 rounded-2xl'>
                <label className='hover:shadow-lg hover:bg-gray-400/20 p-[4px] 
                    shadow:shadow-stone-800  rounded-full'>
                <input type="file" className='hidden' onChange={uploadAvatar}/>
                {<img src={user?.avatar ? user?.avatar : "https://res.cloudinary.com/de1blm1xn/image/upload/v1710182882/randomuser.png"} 
                    alt="" className='w-28 h-28  rounded-full object-cover'/>}
                </label>
                <h1 className='text-4xl  font-semibold'
                     >{user?.username}</h1>
                <h2 className='text-xl mt-2 font-semibold text-stone-500'>
                    {user?.email}</h2>
            </div>
            {/* Privacy Security */}
            <div className='mt-6 flex items-center p-4 flex-col 
                w-full shadow-lg shadow-stone-300/70 pb-10 rounded-2xl'>
                <div className='p-3 font-semibold flex items-center'>
                    <i className="fi fi-rr-shield-keyhole text-4xl mt-1 "></i>
                    <h1 className='text-lg ml-1'>Account Security</h1>
                </div>
                <p className='mx-4 mb-6 text-stone-600 leading-4 text-center'>Update your password and protect your account.</p>
                <div onClick={togglePop} 
                    className='border-[2px] border-stone-600 font-semibold text-stone-600 cursor-pointer px-4 py-1 rounded-lg'>
                        Change Password
                </div>
            </div>
            {/* Change username and Email */}
            <div className='mt-6 flex items-center p-4 flex-col 
                w-full shadow-lg shadow-stone-300/70 pb-10 rounded-2xl'>
                <div className='p-3 font-semibold flex items-center'>
                    <i className="fi fi-rr-shield-keyhole text-4xl mt-1 "></i>
                    <h1 className='text-lg ml-1'>User Credentials</h1>
                </div>
                <p className='mx-4 mb-6 text-stone-600 leading-4 text-center'>Update your username and email to protect your account.</p>
                <div onClick={togglePop2} 
                    className='border-[2px] border-stone-600 font-semibold text-stone-600 cursor-pointer px-4 py-1 rounded-lg'>
                        Change Email
                </div>
            </div>
        </div>
        {/* Change password Modal */}
        {popModal && 
            <div 
            className='w-full fixed z-50 h-full top-0 -left-0 bg-stone-900/50 backdrop-blur-sm flex justify-center py-24 '>
            <div className='z-20 w-[35%] h-[90%] bg-white rounded-xl py-2'>
                <div className='flex pb-3 relative justify-center items-center border-b-2 border-stone-400'>
                    <h2 className='text-center font-semibold text-lg'>Update Password</h2>
                    <div className='px-2 absolute right-4 cursor-pointer hover:bg-stone-200 rounded-full'  onClick={togglePop}>X</div>
                </div>
                <div className='mx-12 mt-12 flex flex-col justify-between'>
                    <label className='text-2xl font-semibold '>Change Password</label>
                    <p className='text-stone-600 mb-4 leading-4'>Password will not be visible, under data policy.</p>
                    <input className='py-2 px-4 border-2 border-stone-400 outline-stone-400 rounded-lg' 
                        type="text" value={newpass} onChange={(ev) => setnewPass(ev.target.value)}/>
                    <label className='text-2xl font-semibold mt-8'>Confirm Password</label>
                    <p className='text-stone-600 mb-4 leading-4'>Password should be same as above.</p>
                    <input className='py-2 px-4 border-2 border-stone-400 outline-stone-400 rounded-lg' 
                        type="text" value={cnfnewPass} onChange={(ev) => setCnfnewPass(ev.target.value)}/>
                    
                    <div className='bg-secondary py-3 rounded-md text-xl mt-8 text-center font-semibold text-white'
                        onClick={updatePassword}>
                            Update
                    </div>
                </div>       
            </div>
            </div>
        }

        {/* Change Email Username Modal */}
        {popModal2 && 
            <div 
                className='w-full fixed z-50 h-full top-0 -left-0 bg-stone-900/50 backdrop-blur-sm flex justify-center py-24 '>
                <div className='z-20 w-[35%] h-[90%] bg-white rounded-xl py-2'>
                    <div className='flex pb-3 relative justify-center items-center border-b-2 border-stone-400'>
                        <h2 className='text-center font-semibold text-lg'>Update Credentials</h2>
                        <div className='px-2 absolute right-4 cursor-pointer hover:bg-stone-200 rounded-full'  onClick={togglePop2}>X</div>
                    </div>
                    <div className='mx-12 mt-12 flex flex-col justify-between'>
                        <label className='text-2xl font-semibold '>Change Email Address</label>
                        <p className='text-stone-600 mb-4 leading-4'>Email will be visible to guests, under data policy.</p>
                        <input className='py-2 px-4 border-2 border-stone-400 outline-stone-400 rounded-lg' 
                            type="text" value={newemail} onChange={(ev) => setnewEmail(ev.target.value)}/>
                        <label className='text-2xl font-semibold mt-8'>Change Username</label>
                        <p className='text-stone-600 mb-4 leading-4'>Username is private for your account.</p>
                        <input className='py-2 px-4 border-2 border-stone-400 outline-stone-400 rounded-lg' 
                            type="text" value={newUsername} onChange={(ev) => setnewUsername(ev.target.value)}/>
                        
                        <div className='bg-secondary py-3 rounded-md text-xl mt-8 text-center font-semibold text-white'
                            onClick={updateCredentials}>
                                Update
                        </div>
                    </div>       
                </div>
            </div>
        }

        {/* RIGHT DIV */}
        <div className='w-[80%] h-[90%] mr-44'>
            <div className='w-full h-full p-6 shadow-lg shadow-stone-300/70 rounded-2xl'>
                
                <div className='w-full my-2 mx-3 '>
                    <label  
                     className='text-2xl font-semibold'>Your complete name
                    </label>
                    <p className=' text-stone-600 my-2'>A name for your billings and accounting purpose. Must be same as in identity proof.</p>
                    <input type="text" placeholder='firstname  middlename  surname'
                     value={fullname} onChange={ev => {setFullname(ev.target.value)}}
                     className='w-80 p-3 text-lg outline-stone-500 rounded-md border-[1.5px] border-stone-400'
                    />
                </div>
                <div className='w-full mt-8 mx-3'>
                    <label 
                        className='text-2xl font-semibold'>
                        Your contacts
                    </label>
                    <p className=' text-stone-600 my-2'>A public phone number to contact you. It be provided to guests.</p>
                    <div className='flex items-center'>
                        <input type="text" placeholder='+91 -xx xxxx xxxx'
                         value={phone} onChange={ev => {setPhone(ev.target.value)}}
                         className='w-40 p-3 text-lg outline-stone-500 rounded-md border-[1.5px] border-stone-400' 
                        /> 
                        <div className='border-[2px] ml-2 border-stone-400 px-3 py-2 rounded-md'>
                            <i className="fi fi-rr-plus"></i>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-8 mx-3 '>
                    <label  
                     className='text-2xl font-semibold'>Birth Date
                    </label>
                    <p className=' text-stone-600 my-2'>This information will not be visible to anyone. Only used to business purposes.</p>
                    <input type="date" placeholder='dd-mm-yyyy'
                     value={birth} onChange={ev => {setBirth(ev.target.value)}}
                     className='w-40 p-3 text-lg outline-stone-500 rounded-md border-[1.5px] border-stone-400' 
                    /> 
                </div>
                <div className='w-full my-8 mx-3 '>
                    <label  
                     className='text-2xl font-semibold'>Gender
                    </label>
                    <p className=' text-stone-600 my-2'>This information will not be visible to anyone. Only used to business purposes.</p>
                    <input type="text" placeholder=''
                     value={gender} onChange={ev => {setGender(ev.target.value)}}
                     className='w-40 p-3 text-lg outline-stone-500 rounded-md border-[1.5px] border-stone-400'                     /> 
                </div>
                <div className='w-full my-8 mx-3'>
                    <label  
                     className='text-2xl font-semibold'>Nationality
                    </label>
                    <p className=' text-stone-600 my-2'>Providing your nationality and residence will help in better recommendation of properties.</p>
                    <input type="text" placeholder='Indian'
                     value={nationality} onChange={ev => {setNationality(ev.target.value)}}
                     className='w-40 p-3 text-lg outline-stone-500 rounded-md border-[1.5px] border-stone-400'                     /> 
                </div>
                <div className='my-2'>
                    <button type="submit" className='px-4 w-full py-3 rounded-xl bg-primary 
                        text-lg font-semibold text-white'>
                        Save Profile
                    </button>
                </div>
                
            </div>
        </div>
    </form>
  )
}

export default UserProfile