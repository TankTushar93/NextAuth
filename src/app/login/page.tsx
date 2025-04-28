"use client"
import { useState,useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/navigation';
const page = () => {    

    const router = useRouter();
    const [user,setUser] = React.useState({email:"",password:""});
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onLogin = async () =>{
        try {
            setLoading(true);
            const data = await axios.post('/api/users/login',user);
            console.log(data);
                router.push('/profile');
        } catch (error: any) {
            console.log(error.response.data);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])
  return (
    <div className='flex items-center justify-center min-h-screen p-5 '>
    <form onSubmit={(e)=>{e.preventDefault();onLogin();}} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-9">Login Here</h2>
   
    <div className="flex items-center gap-1 pl-2 my-2 border rounded bg-indigo-500/5 border-gray-500/10">
        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" />
            <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"/>
        </svg>
        <input value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} className="w-full text-black outline-none bg-transparent py-2.5" type="email" placeholder="Email" required/>
    </div>
    <div className="flex items-center gap-1 pl-2 mt-2 mb-8 border rounded bg-indigo-500/5 border-gray-500/10">
        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" />
            <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"/>
        </svg>
        <input value={user.password} onChange={(e) => setUser({...user,password:e.target.value})} className="w-full text-black outline-none bg-transparent py-2.5" type="password" placeholder="Password" required/>
    </div>
    <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">Login</button>
    <p className="mt-4 text-center">You Dont Have Any Account? <Link href={'/signup'} className="text-blue-500 underline">Create Account</Link></p>
</form>
    </div>
  )
}

export default page
