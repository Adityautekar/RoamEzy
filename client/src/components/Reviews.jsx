import React from "react";

export default function Reviews({ reviewsList }) {
    return (
        <div className="w-full grid grid-rows-3 grid-cols-2 text-left">
            {reviewsList?.length > 0 && reviewsList.map((review) => (
                <div key={review._id} className="h-auto mb-10 pr-28">
                    <div className="flex justify-start items-center">
                        <img className="h-14 w-16 object-cover rounded-full" src={review.useravatar} alt="" />
                        <div className="ml-4 flex justify-between w-full items-center">
                            <div>
                                <h3 className="font-semibold text-lg">{review.username}</h3>
                                <div className="flex mt-1 mr-3 space-x-0.5">
                                {/* Render star ratings dynamically based on review.rating */}
                                {[...Array(review.rating)].map((_, index) => (
                                    <i key={index} className="fi fi-ss-star text-[14px]"></i>
                                ))}
                                </div>
                            </div>
                            <div className="font-semibold mr-4">
                                <h1>{review.date.toString().slice(0,10)}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">{review.content}</div>
                </div>
            ))}
        </div>
    )
}
