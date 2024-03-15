import React from 'react'

export default function Features({selected, onChange}) {
    function handleCheckboxClick(ev){
        const checked = ev.target.checked;
        const name = ev.target.name;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }
  return (
    <>
    <h2 className='text-xl font-semibold '>Features</h2>
        <div className=' flex flex-cols justify-between mb-1'>
            <div>
                <label className='flex items-center '>
                    <input type="checkbox" checked={selected?.includes('wifi')} name='wifi' onChange={handleCheckboxClick} className='h-4 w-4 accent-green-500'/>
                    <i className='fi fi-rs-wifi ml-2 pt-1'></i>
                    <p className='ml-5'>Wifi</p>
                </label>
                <label className='flex items-center'>
                    <input type="checkbox" checked={selected?.includes('balcony')} name='balcony' onChange={handleCheckboxClick}  className='h-4 w-4 accent-green-500'/>
                    <i className='fi fi-rs-window-frame ml-2 pt-1'></i>
                    <p className='ml-1'>Balcony</p>
                </label>    
            </div>
            <div>
                <label className='flex items-center'>
                    <input type="checkbox" checked={selected?.includes('swimming-pool')} name='swimming-pool' onChange={handleCheckboxClick} className='h-4 w-4 accent-green-500'/>
                    <i className='fi fi-rs-swimmer ml-2 pt-1'></i>
                    <p className='ml-1'>Swimming Pool</p>
                </label>
                <label className='flex items-center'>
                    <input type="checkbox" checked={selected?.includes('air-conditioner')} name='air-conditioner' onChange={handleCheckboxClick} className='h-4 w-4 accent-green-500'/>
                    <i className='fi fi-rs-air-conditioner ml-2 pt-1'></i>
                    <p className='ml-1'>Air Conditioner</p>
                </label>
            </div>
            <div>
                <label className='flex items-center'>
                    <input type="checkbox" checked={selected?.includes('pets')} name='pets' onChange={handleCheckboxClick} className='h-4 w-4 accent-green-500'/>
                    <i className='fi fi-rs-dog ml-2 pt-1'></i>
                    <p className='ml-1'>Pets</p>
                </label>
                <label className='flex items-center'>
                    <input type="checkbox" checked={selected?.includes('parking')} name='parking' onChange={handleCheckboxClick} className='h-4 w-4 accent-green-500'/>
                    <i className='fi fi-rs-car ml-2 pt-1'></i>
                    <p className='ml-1'>Parking</p>
                </label>
            </div>
            <div>
                <label className='flex items-center'>
                    <input type="checkbox" checked={selected?.includes('tv')} name='tv' onChange={handleCheckboxClick} className='h-4 w-4 accent-green-500'/>
                    <i className='fi fi-rs-tv-music ml-2 pt-1'></i>
                    <p className='ml-1'>T.V</p>
                </label>
                <label className='flex items-center'>
                    <input type="checkbox" checked={selected?.includes('kitchen')} name='kitchen' onChange={handleCheckboxClick} className='h-4 w-4 accent-green-500'/>
                    <i className='fi fi-rs-oven ml-2 pt-1'></i>
                    <p className='ml-1'>Kitchen</p>
                </label>
            </div>
        </div>
    </>
  )
}

