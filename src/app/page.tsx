"use client"
import { useState,useEffect } from "react"


export default function Page() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const client_id = "test";
  const state = "qwerty";
  const redirect_uri = "http://127.0.0.1:3001";
  const scope = "write";  
  const response_type = "code";

  const req_url = `http://127.0.0.1:3001/oauth/authorize?response_type=${response_type}&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}&scope=${scope}`;

  return (
    <>
    <section>
      <form action={req_url} className="flex flex-col space-y-4 w-1/4 m-auto">
        <label>Login</label>
        <input onChange={e => setLogin(e.target.value)} className="border-2" type="email" name="login" id="login" />
        <label>Password</label>
        <input onChange={e => setPassword(e.target.value)} className="border-2" type="password" name="password" id="password" />
        <button className="border-2 bg-gray-700 text-white w-1/4 self-center" type="submit">Send</button>
      </form>
    </section>
    </>
  
    );
  }