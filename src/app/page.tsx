"use client"
import { useState,useEffect } from "react"


export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const submitData = {email,password}

    try {
      const req_str = `http://localhost:3002/callback/passkeep?email=${email}&password=${password}`;
      console.log(req_str);
      const res = await fetch(req_str,{
        method: 'GET',
      })
      console.log(res)
      if(res.ok){
        console.log("Success!")
      }else{
        console.log("Error!")
      }
    } catch (error) {
        console.log(error)
    }
    setEmail('')
    setPassword('')
  }

  return (
    <>
    <section>
      <form action={() => handleSubmit()} className="flex flex-col space-y-4 w-1/4 m-auto">
        <label>Email</label>
        <input onChange={e => setEmail(e.target.value)} className="border-2" type="email" name="email" id="email" />
        <label>Password</label>
        <input onChange={e => setPassword(e.target.value)} className="border-2" type="password" name="password" id="password" />
        <button className="border-2 bg-gray-700 text-white w-1/4 self-center" type="submit">Send</button>
      </form>
    </section>
    </>
  
    );
  }