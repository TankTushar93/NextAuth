'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState ,useEffect} from "react";
import React from "react";
import Image from "next/image";
import { assets } from "../../../assets/assets";


 const LogoutPage = ()=> {

  const router = useRouter();
  // Static user data (you can later connect it to backend if needed)
  const [user,setUser] = useState({email:"",name:""});
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/users/getdata'); // Make sure this API exists
        setUser({
          email: res.data.email,
          name: res.data.name,
        });
       
      } catch (error) {
        console.log(error);
         // If not authenticated, redirect
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout =  () => {
    try {
     const data = axios.get('/api/users/logout');
     console.log(data);
     router.push('/login');
    } catch (error:any) {
      console.log(error);
    }
    // Later: You can add navigation or clear cookies here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
        <div className="flex justify-center mb-6">
         
        </div>
        <div className="flex items-center justify-center w-full">
            <Image className='object-cover rounded-full h-15 w-15' src={assets.header_img} alt='Hello' height={1} width={1}/>
        </div>
        
        <h1 className="mb-2 text-2xl font-bold text-gray-800">UserName: {user.name}</h1>
        <p className="mb-6 text-gray-500">Email: {user.email}</p>

        <button
          onClick={handleLogout}
          className="px-6 py-2 font-semibold text-white transition-transform transform bg-indigo-500 rounded-full hover:bg-indigo-600 active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default LogoutPage
