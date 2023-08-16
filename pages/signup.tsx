"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

export default function SignUpPage(){
    const router=useRouter();
    const [loading,setLoading]=React.useState(false)
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false)
    const onSignup=async()=>{
        try{
            setLoading(true);
            const response=await axios.post("/api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login");
        }catch(error:any){
            console.log("SignUp failed",error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    },[user])
    return(
        <>
        <div className="absolute top-0 left-2">
            <Image src="/lgooo.png" alt="Logo" height={80} width={200}/>
        </div>
        <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center min-h-screen max-h-screen md:w-1/2 w-full z-10">
            <h1 className="text-2xl font-semibold text-gray-900 lg:text-white dark:text-black md:w-7/12 w-10/12">{loading?"Processing":"SignUp"}</h1>
            <hr />
            <label htmlFor="username" className="text-base font-semibold mt-5 md:w-7/12 w-10/12 lg:text-white">Username</label>
            <input className="p-2 text-base border font-medium mt-2 md:w-7/12 w-10/12" type="text" id="username" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} 
            placeholder="Username"
            />
            <label htmlFor="email" className="text-base font-semibold mt-5 md:w-7/12 w-10/12 lg:text-white">Email</label>
            <input className="p-2 text-base border font-medium mt-2 md:w-7/12 w-10/12" type="text" id="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} 
            placeholder="Email"
            />
            <label htmlFor="password" className="text-base font-semibold mt-5 md:w-7/12 w-10/12 lg:text-white">Password</label>
            <input className="p-2 text-base border font-medium mt-2 md:w-7/12 w-10/12" type="password" id="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} 
            placeholder="Password"
            />
            <button className=" inline-block rounded bg-neutral-800 p-3 text-base font-base leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]  mb-2 mt-5 md:w-7/12 w-10/12" onClick={onSignup}>
                {buttonDisabled?"No SignUp":"Signup"}
            </button>
            <Link className="inline-block border-black rounded bg-neutral-50 p-3 text-base font-semibold uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] mb-2 mt-4 md:w-7/12 w-10/12 text-center border-blue border" href="/login">Visit Login Page</Link>

            </div>


             {/* Video */}
      <div className="rounded-xl z-0 md:w-1/2 w-full bg-cover bg-[url(/skywalk.png)] md:flex hidden">
        <video
          className="min-w-full min-h-screen max-h-screen rounded-lg object-center"
          src="/background.mp4"
         
          autoPlay
          loop
          muted
        >
            </video>
      </div>

      <div className="z-0 md:hidden">
        <video
          className="fixed top-0 min-w-full min-h-screen max-h-screen object-cover bg-fixed opacity-10"
        //   src="https://app.videoask.com/static/app/media/promo.mp4"
          src="mobile.mov"
          autoPlay
          loop
          muted
        //   playsinline
        />
      </div>
      </div>
        </>
        
    )
}