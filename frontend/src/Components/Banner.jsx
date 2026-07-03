import React from 'react'

const Banner = () => {
  return (
    <div className="flex justify-center px-4">
      <div className="banner h-[200px] md:h-[300px] lg:h-[400px] bg-[#1b74fa] w-full max-w-full md:max-w-[90%] lg:max-w-[1400px] mt-5 rounded-lg overflow-hidden">
        <img src="banner.png" alt="Samsung Banner" className='h-[200px] md:h-[300px] lg:h-[400px] w-full rounded-lg object-cover' />
      </div>
    </div>
  )
}

export default Banner