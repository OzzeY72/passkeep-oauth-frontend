'use client';
import { redirect } from 'next/navigation'
import { FormEvent, use } from 'react'
import { json } from 'stream/consumers';
import { useSearchParams } from 'next/navigation'


export default function Page() {
  const searchParams = useSearchParams()
  async function authorize(event: FormEvent<HTMLFormElement>)
  {
    const r = {
      response_type: searchParams.get('response_type'),
      client_id:     searchParams.get('client_id'),
      state:         searchParams.get('state'),
      redirect_uri:  searchParams.get('redirect_uri'),
      scope:         searchParams.get('scope')
    }
    const req_url = `http://127.0.0.1:3001/oauth/authorize?response_type=${r.response_type}&client_id=${r.client_id}&state=${r.state}&redirect_uri=${r.redirect_uri}&scope=${r.scope}`;
    console.log(req_url);
  
    try{
      const token = localStorage.getItem('token');
      console.log(token);
      await fetch(req_url,
      {
        headers:{"Authorization":`Bearer ${token}`},
        //redirect: "follow",
      })
      .then((res)=>{
        console.log("FETCH");
        if (res.redirected) {
          window.location.href = res.url;
        }
        console.log(res)})
    } 
      catch (error) {
        console.error(error);
      }

  }

  


  //const req_url = `http://127.0.0.1:3001/oauth/authorize?response_type=${response_type}&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}&scope=${scope}`;
  return (
      <form onSubmit={authorize}>
        <button type="submit">Authorize</button>
      </form>
    );
  }