"use client"
import React from 'react'
import Image from 'next/image'
import { assets } from '../assets/assets'
const Imagepage = () => {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
        <div className="p-2 max-w-7xl">
            <Image src={assets.header_img} className="object-cover w-full rounded-lg cursor-pointer w- thumb md:h-89 h-89 hover:opacity-80" height={90} width={90} alt="Main Image"/>
        </div>

        <div className="flex flex-col items-center gap-2 mt-5 text-center w-[50vw] mb-9 h-[20vh] " >
            <h1 className='text-3xl w-[40vw] mt-4 font-semibold text-center '>Hello User: Bello</h1>
            <p className='text-3xl w-[40vw]   font-semibold text-center '>Thank You For Login!!!</p>
        </div>
    </div>

    
  )
}

export default Imagepage
