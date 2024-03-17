'use client';
import { FormEvent, useCallback } from 'react'
import { json } from 'stream/consumers';
import { useState, useEffect } from 'react';
import SendPostRequest from '@/services/sendpostrequest';

export default function Page() {
  const [token, setToken] = useState('');

  const handleSubmit = useCallback( async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = {
      "username":formData.get("login"),
      "password":formData.get("password"),
    }

    const response = await SendPostRequest({
      req_url: "http://127.0.0.1:3001/auth/login",
      data: data
    });

    localStorage.setItem('token',response.access_token);

  },[])
  /*
  const client_id = "test";
  const state = "qwerty";
  const redirect_uri = "http://127.0.0.1:3001";
  const scope = "write";  
  const response_type = "code";*/

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