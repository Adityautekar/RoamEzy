import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import { userContext } from '../context/userContext.jsx';
import { toastNotification } from '../utils/Toast.jsx';
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(userContext);
    const [typeofpass, setTypeofpass] = useState("password")
    const [visible, setVisible] = useState(false)
    async function handleLogin(ev) {
        ev.preventDefault();
        try {
            if( email === '' || password === ''){
                toastNotification("WARNING", "Required fields empty...")
            } else {
                const {data} = await axios.post('/login', {email, password});
                setUser(data);
                toastNotification("SUCCESS","Login Successfull");
                setRedirect(true);
            }
        } catch (error) {
            toastNotification("ERROR","Invalid credentials");
        }
    }

    function toggleVis(ev){
        ev.preventDefault();
        setVisible((prev) => !prev);
        if(typeofpass==="password"? setTypeofpass("text") : setTypeofpass("password"));
    }

    if (redirect){
        return <Navigate to={'/'}/>
    }
  return (
    <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
        <div className='w-[30%] h-full bg-gray-100 py-4 rounded-xl m-6 shadow-sm shadow-gray-500'>
            <div className='relative flex justify-center items-center pb-3 border-b-[1px] border-gray-300'>
                <h2 className='text-lg font-semibold'>Login</h2>
            </div>
            <form className='w-80% mx-6'
                onSubmit={handleLogin} 
                >
                <h1 className='text-2xl font-semibold py-6'>Welcome to Airbnb</h1>
                <div className='grid grid-rows-2 border-[1.5px] py-1 border-gray-400 rounded-lg'>
                    <div className='flex justify-between px-3 p-2 items-center'>
                        <input type="text" placeholder='Email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='outline-none w-full bg-gray-100 text-lg font-light tracking-wider ' />
                    </div>
                    <div className='px-3 flex items-center border-t-[1.5px] border-stone-400'>
                        <input type={typeofpass} placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='outline-none w-full bg-gray-100 text-lg font-light tracking-wider '/>
                            <button onClick={toggleVis}>{visible===true ? <i className="fi fi-rr-eye"></i>:<i className="fi fi-rr-eye-crossed"></i>}</button>
                    </div>
                </div>
                <p className='text-xs text-stone-600 mt-3'>If you are a new user.
                 <Link to={"/signup" }className='font-semibold text-xs underline'>Register.</Link> </p>
                <button  className=' w-full py-2.5 rounded-lg my-3 font-semibold text-lg text-white bg-[#e32051]'>
                    Continue
                </button>
                <div className='content w-full h-[0.5px] bg-gray-400 my-4'></div>
                <button className='w-full relative flex py-3 mt-4 mb-4 justify-center items-center border-[1.5px] border-gray-600 rounded-lg font-semibold'>
                    <img width="20" height="20" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" className='absolute left-6'/>
                    <h2>Continue with Google</h2>
                </button>
                <button className='w-full relative flex py-3 my-2 justify-center items-center border-[1.5px] border-gray-600 rounded-lg font-semibold'>
                    <img width="20" height="20" src="https://img.icons8.com/color/48/gmail-new.png" alt="google-logo" className='absolute left-6'/>
                    <h2>Continue with Email</h2>
                </button>
                
            </form>
        </div>
    </div>
  )
}

export default LoginPage