import React from "react";

export default function Ratings({ rating }) {
    return (
        <div className="w-full">
            <div className=" mb-8">
                <div className="justify-center flex">
                    <img className="h-[120px]" src="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg" alt="" />
                    <div className="h-[120px]"><h1 className="text-8xl font-semibold text-stone-800">{rating}</h1></div>
                    <img className="h-[120px]" src="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg" alt="" />
                </div>
                <div className="text-xl font-semibold text-center">Guest favourite</div>
                <div className="flex items-center justify-center "><p className="text-lg text-stone-500 w-[350px] leading-6">One of the most loved homes in Airbnb based on ratings, reviews and reliability</p></div>
            </div>
            <div className="grid grid-cols-7 my-12 h-[120px]">
                <div className="">
                    <h2 className="text-left font-semibold pb-2">Overall rating</h2>
                    <div className="grid grid-rows-5 text-sm">
                        <div className="flex justify-between h-[15px] items-center">
                            <div>5</div>
                            <div className="bg-stone-800 rounded-sm m-auto mr-8 h-1 w-full mx-4"></div>
                        </div>
                        <div className="flex justify-between h-[15px] items-center">
                            <div>4</div>
                            <div className="bg-gray-300 rounded-sm m-auto mr-8 h-1 w-full mx-4"></div>
                        </div>
                        <div className="flex justify-between h-[15px] items-center">
                            <div>3</div>
                            <div className="bg-gray-300 rounded-sm m-auto mr-8 h-1 w-full mx-4"></div>
                        </div>
                        <div className="flex justify-between h-[15px] items-center">
                            <div>2</div>
                            <div className="bg-gray-300 rounded-sm m-auto mr-8 h-1 w-full mx-4"></div>
                        </div>
                        <div className="flex justify-between h-[15px] items-center">
                            <div>1</div>
                            <div className="bg-gray-300 rounded-sm m-auto mr-8 h-1 w-full mx-4"></div>
                        </div>
                        
                    </div>

                </div>
                <div className="px-5 h-[110px] flex flex-col justify-between border-l-2 border-stone-200">
                    <div className="text-left">
                        <div className="font-semibold">Cleanliness</div>
                        <div className="font-bold">{rating}</div>
                    </div>
                    <div className="text-left">
                        <i class="fi fi-rs-clean text-[30px]"></i>
                    </div>
                </div>
                <div className="px-5 h-[110px] flex flex-col justify-between border-l-2 border-stone-200">
                    <div className="text-left">
                        <div className="font-semibold">Accuracy</div>
                        <div className="font-bold">5.0</div>
                    </div>
                    <div className="text-left">
                    <i class="fi fi-rs-check-circle text-[30px]"></i>
                    </div>
                </div>
                <div className="px-5 h-[110px] flex flex-col justify-between border-l-2 border-stone-200">
                    <div className="text-left">
                        <div className="font-semibold">Check-in</div>
                        <div className="font-bold">5.0</div>
                    </div>
                    <div className="text-left">
                        <i class="fi fi-rs-key text-[30px]"></i>
                    </div>
                </div>
                <div className="px-5 h-[110px] flex flex-col justify-between border-l-2 border-stone-200">
                    <div className="text-left">
                        <div className="font-semibold">Communication</div>
                        <div className="font-bold">5.0</div>
                    </div>
                    <div className="text-left">
                        <i class="fi fi-rs-comment-alt-middle text-[30px]"></i>
                    </div>
                </div>
                <div className="px-5 h-[110px] flex flex-col justify-between border-l-2 border-stone-200">
                    <div className="text-left">
                        <div className="font-semibold">Location</div>
                        <div className="font-bold">4.7</div>
                    </div>
                    <div className="text-left">
                        <i class="fi fi-rs-map text-[30px]"></i>
                    </div>
                </div>
                <div className="px-5 h-[110px] flex flex-col justify-between border-l-2 border-stone-200">
                    <div className="text-left">
                        <div className="font-semibold">Value</div>
                        <div className="font-bold">4.8</div>
                    </div>
                    <div className="text-left">
                        <i class="fi fi-rs-tags text-[30px]"></i>
                    </div>
                </div>
                
            </div>
        </div>
    )
}