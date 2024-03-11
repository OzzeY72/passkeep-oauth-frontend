'use client';
import { FormEvent } from 'react'
import { json } from 'stream/consumers';
import { useState, useEffect } from 'react';

export default function Page() {
  const [token, setToken] = useState('');

  const req_url = "http://127.0.0.1:3001/auth/login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    console.log(formData)
    const data = {
      "username":formData.get("login"),
      "password":formData.get("password"),
    }
    console.log(data);
    try{
    await fetch(req_url,
      {
        method: "POST",
        mode:"cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('token', data.access_token);
        setToken(data.access_token);

      })
    }
    catch (error) {
      console.error(error);

    }
  }

  const client_id = "test";
  const state = "qwerty";
  const redirect_uri = "http://127.0.0.1:3001";
  const scope = "write";  
  const response_type = "code";

  //const req_url = `http://127.0.0.1:3001/oauth/authorize?response_type=${response_type}&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}&scope=${scope}`;
  
  return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-1/4 m-auto">
        <label>Login</label>
        <input  className="border-2" type="email" name="login" id="login" />
        <label>Password</label>
        <input className="border-2" type="password" name="password" id="password" />
        <button className="border-2 bg-gray-700 text-white w-1/4 self-center" type="submit">Send</button>
      </form>
    );
  }