import React from 'react'

function Page404() {
  return (
    <div className='flex relative h-screen w-full justify-center items-center pb-20'>
        <img src="../404Error.jpg" alt="ERROR 404 PAGE NOT FOUND"
         className='object-contain h-[400px] w-[600px]' />
         <h1 className='absolute bottom-40 text-6xl font-bold text-[#1b2e35]'>PAGE NOT FOUND</h1>
         <button></button>
    </div>
  )
}

export default Page404