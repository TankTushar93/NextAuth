"use client"
import { useEffect , useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

const page = () => {

    const [user,setUser] = useState({name:"",email:"",password:""});
    const [showLogin,setShowLogin] = React.useState(false);
    const router = useRouter();

    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loading,setLoading] = useState(false);
    const onSignup = async () =>{
       
        try {
            setLoading(true) 
          const data = await axios.post('/api/users/signup',user);
         
           console.log("signup success",data);
           router.push('/login');
          
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
        
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.name.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])
  return (
    <>
    <div className='flex items-center justify-center min-h-screen p-5 noscroll'>
    <form onSubmit={(e) => {e.preventDefault();onSignup()}} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-9">{loading ? "Processing" : "Sign Up"}</h2>
    <div className="flex items-center gap-1 pl-2 my-2 border rounded bg-indigo-500/5 border-gray-500/10">
        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
        </svg>
        <input value={user.name} onChange={(e) => setUser({...user,name:e.target.value})} className="w-full text-black outline-none bg-transparent py-2.5" type="text" placeholder="Username" required/>
    </div>
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
    <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">{buttonDisabled ? "No Sign Up" : "Sign Up"}</button>
    <p className="mt-4 text-center">Already have an account? <Link href={'/login'} className="text-blue-500 underline">Log In</Link></p>
</form>
    </div>
    </>
  )
}

export default page
