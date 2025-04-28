"use client"
import { useState } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {assets} from '../assets/assets'
import { useRouter } from 'next/navigation'
const Navbar = () => {
    const router = useRouter();
    const [user,setUser] = useState(false);
  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-gradient-to-r from-indigo-200 to-purple-400 transition-all">
        
    <Link href="/">
        <Image className="h-9" src={assets.logo} height={90} width={90}  alt="dummyLogoWhite"/>
    </Link>

    <ul className="items-center hidden gap-10 text-center text-white md:flex">
        <li><Link className="transition hover:text-white/70" href={'/'}>Home</Link></li>
        <li><Link className="transition hover:text-white/70" href="/signup">Sign Up</Link></li>
        <li><Link className="transition hover:text-white/70" href="/login">Login</Link></li>
        <li><Link className="transition hover:text-white/70" href="/logout">LogOut</Link></li>

    </ul>

 <button onClick={()=>router.push('/profile')} type="button" className="hidden transition-all bg-white rounded-full md:inline hover:opacity-90 active:scale-95 ">
        <Image className='object-cover w-10 h-10 rounded-full' src={assets.header_img} alt='Hello' height={19} width={19}/>
        </button>
       
    

    {/**Mobile View */}

    <button aria-label="menu-btn" type="button" className="inline-block transition menu-btn md:hidden active:scale-90">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#fff">
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
        </svg>
    </button>

    <div className="mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 hidden md:hidden">
        <ul className="flex flex-col space-y-4 text-lg text-white">
            <li><a href="#" className="text-sm">Home</a></li>
            <li><a href="#" className="text-sm">Services</a></li>
            <li><a href="#" className="text-sm">Portfolio</a></li>
            <li><a href="#" className="text-sm">Pricing</a></li>
        </ul>
        <button type="button" className="inline w-40 mt-6 text-sm text-gray-700 transition-all bg-white rounded-full md:hidden hover:opacity-90 active:scale-95 h-11">
            Get started
        </button>
    </div>
</nav>


  )
}

export default Navbar
