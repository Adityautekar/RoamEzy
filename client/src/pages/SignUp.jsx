import {React, useState} from 'react'
import { Link, Navigate  } from 'react-router-dom'
import axios from "axios";
import { toastNotification } from '../utils/Toast.jsx';
function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [typeofpass, setTypeofpass] = useState("password")
    const [redirect, setRedirect] = useState(false);
    const [visible, setVisible] = useState(false)

    function toggleVis(ev){
        ev.preventDefault();
        setVisible((prev) => !prev);
        if(typeofpass==="password"? setTypeofpass("text") : setTypeofpass("password"));
    }

    async function RegisterUser(ev) {
        ev.preventDefault();
        try {
            if(username === '' || email === '' || password === ''){
                toastNotification("WARNING", "Required fields empty...")
            } else if ( password.length > 12 ) {
                toastNotification("WARNING", "Password should be 12 characters...")
            } else {
                const res = await axios.post("/register", {
                    username,
                    email,
                    password
                });
                if(res.status === 200){
                    toastNotification("SUCCESS", "Registration Successfull")
                    setRedirect(true);
                }   
            }  
        } catch (error) {
            toastNotification("ERROR","User Registration Failed!")
        }
    }

    if (redirect){
        return <Navigate to={'/login'}/>
    }
  return (
    <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
        <div className='w-[30%] h-auto bg-gray-100 py-4 rounded-xl my-6 shadow-sm shadow-gray-500'>
            <div className='relative flex justify-center items-center pb-4 border-b-[1px] border-gray-300'>
                <h2 className='text-md font-semibold'>Login or Sign Up</h2>
            </div>
            <form 
                onSubmit={RegisterUser} 
                className='w-80% mx-6'>
                <h1 className='text-xl font-semibold py-4'>Join Airbnb</h1>
                <div className='grid grid-rows-3 border-[1.5px] py-1 border-gray-400 rounded-lg'>
                    <div className='flex justify-between px-3 p-2 items-center'>
                        <input type="text" 
                            placeholder='Username' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        className='outline-none w-full bg-gray-100 text-lg font-light tracking-wider ' />
                    </div>
                    <div className='flex justify-between px-3 p-2 border-t-[1.5px] border-gray-400 items-center'>
                        <input type="email" 
                            placeholder='Email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        className='outline-none w-full bg-gray-100 text-lg font-light tracking-wider ' />
                    </div>
                    <div className='px-3 flex items-center border-t-[1.5px] border-gray-400'>
                        <input type={typeofpass} 
                            placeholder='Password'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        className='outline-none w-full bg-gray-100 text-lg font-light tracking-wider '/>
                        <button onClick={toggleVis}>{visible===true ? <i className="fi fi-rr-eye"></i>:<i className="fi fi-rr-eye-crossed"></i>}</button>
                    </div>
                </div>
                <p className='text-xs text-stone-600 mt-3'>If already a user.
                 <Link to="/login" className='font-semibold text-xs underline'>Login.</Link> </p>
                <button type='submit' className=' w-full py-2.5 rounded-lg my-3 font-semibold text-lg text-white bg-[#e32051]'>
                    Register
                </button>
                <div className='content w-full h-[0.5px] bg-gray-400 my-4'></div>
                <button className='w-full relative flex py-3 mt-4 mb-4 justify-center items-center border-[1.5px] border-gray-600 rounded-lg font-semibold'>
                    <img width="20" height="20" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" className='absolute left-6'/>
                    <h2>Continue with Google</h2>
                </button>
                <button className='w-full relative flex py-3 my-3 justify-center items-center border-[1.5px] border-gray-600 rounded-lg font-semibold'>
                    <img width="20" height="20" src="https://img.icons8.com/color/48/gmail-new.png" alt="google-logo" className='absolute left-6'/>
                    <h2>Continue with Email</h2>
                </button>   
            </form>
        </div>
    </div>
  )
}

export default SignUp