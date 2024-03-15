import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { userContext } from '../context/userContext.jsx'
import { searchContext } from '../context/searchContext.jsx';
import { toastNotification } from '../utils/Toast.jsx';
function Header() {
  const {user} = useContext(userContext);
  const {s_place, setS_place, keyword, setKeyword, ready, setReady} = useContext(searchContext);
  const [searchbar, setSearchbar] = useState(false)
  // const {places, setPlaces} = useContext()
  function toggleSearchbar(ev){
    ev.preventDefault();
    setSearchbar(prev => !prev)
  }

  async function Searchplace(ev){
    ev.preventDefault();
    const places =  await axios.post('/search', {s_place, keyword});
    if(places?.data?.length>0){
      setReady(places.data);
    } else {
      toastNotification("ERROR","Place not Found...")
    }

  }

  return (
    <>
    <div className='sticky z-50 top-0 w-full bg-stone-100 py-2 border-b-2 border-stone-300'>
      <h1 className='text-center text-lg  underline '>For a Hassle free travel and staycation, Just RoamEzy.</h1>
    </div>
    <header className='shadow sticky z-50 top-0 w-full  '>
        <nav className="bg-gray-100 px-4 lg:px-6 py-3">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/de1blm1xn/image/upload/v1709733524/anmhtwa3bhbn1aoestqd.png"
                className=" h-9 w-40 rounded-md"
                alt="Logo" width={100}
              />
            </a>
            <div className="flex items-center lg:order-2">
              <Link
                  to="/contact"
                  className=" bg-gray-100 hover:bg-gray-200 
                   font-medium 
                  rounded-3xl text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none duration-400"
              >
                  Learn About Us
              </Link>
              <div
                  // to="#"
                  className="text-gray-00 flex items-center bg-gray-100 hover:bg-gray-200 
                   p-3 font-medium rounded-3xl text-sm mr-2 focus:outline-none duration-400"
              >
                  <i className="fi fi-rr-globe"></i>
              </div>
              <Link to={user?'/account':'/login'}
                  className="text-white bg-gray-600 hover:shadow-md shadow-gray-900 
                 rounded-full h-10 w-10 items-center justify-center focus:outline-none duration-400 flex"
              >
                  {user?.avatar ? <img src={user?.avatar} alt="" className='h-10 w-10 rounded-full object-cover' />  : <i className="fi fi-sr-user"></i>}
                  
              </Link>
            </div>
            <div className="hidden justify-between border-[1.5px] border-stone-300 shadow p-1
               rounded-3xl items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2">
              <div className="flex flex-row items-center bg-gray-100 mt-4 rounded-3xl font-medium 
              lg:flex-row lg:mt-0">
                <div className="pl-5 pr-5 cursor-pointer" onClick={toggleSearchbar} >
                  <h2 className="block py-2 pr-4 pl-3 duration-200 text-stone-700 hover:text-primary ">
                    Search property
                  </h2>
                </div>
                <div className="bg-primary rounded-full px-3 flex py-2">
                  <i className="fi fi-br-search mt-auto text-white text-sm"></i>
                </div>    
              </div>
            </div>
          </div>

        </nav>
        {/* Searchbar code */}
        <div className={`w-full h-20 ${searchbar?"flex":"hidden"} transition ease-in-out bg-white justify-center items-center p-2`}>
          <div className='flex border-[1.5px] border-stone-300 pl-8 pr-2 py-2 rounded-full'>
            <div className='flex flex-col text-sm leading-3 py-1'>
              <label className='text-[12px] font-semibold'>Where</label>
              <input type="text" placeholder='Search Destination' 
              value={s_place} 
              onChange={(ev) => setS_place(ev.target.value)} 
              className='outline-none '/>
            </div>
            <div className='flex flex-col text-sm leading-3 py-1'>
              <label className='text-[12px] font-semibold'>What</label>
              <input type="text" placeholder='Search Place' 
              value={keyword} 
              onChange={(ev) => setKeyword(ev.target.value)} 
              className='outline-none '/>
            </div>
            <button onClick={Searchplace}
              className='bg-secondary flex justify-between items-center pr-8 pl-4 py-1 rounded-full'>
              <i className='fi fi-br-search text-white text-sm'></i>
              <label className='font-semibold text-white ml-3 cursor-pointer'>Search</label>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header