"use client"
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";



const verifyemailpage = () => {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();  
        }
    },[token])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 text-2xl font-semibold text-white bg-green-400 rounded-2xl">{token ? `${token}` : "No token"}</h2>

        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login">Login</Link>
            </div>
        )}
        
        {error && (
            <div className="flex flex-col gap-3">
                <h2 className="p-2 text-2xl font-semibold text-white bg-red-400 cursor-pointer rounded-2xl">Error</h2>
                <Link className="p-2 text-2xl font-semibold text-white bg-green-400 rounded-2xl" href="/login">Login</Link>
            </div>
        )}
    </div>
  )
}

export default verifyemailpage;
