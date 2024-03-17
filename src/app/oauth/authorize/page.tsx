'use client';
import { redirect } from 'next/navigation'
import { FormEvent, use, useCallback } from 'react'
import { json } from 'stream/consumers';
import { useSearchParams } from 'next/navigation'
import SendCodeRequest from '@/services/sendcoderequest'


export default function Page() {
  const searchParams = useSearchParams()
  
  const authorize = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    await SendCodeRequest({
      req_url: "http://127.0.0.1:3001/oauth/authorize",
      response_type: searchParams.get('response_type')!,
      client_id: searchParams.get('client_id')!,
      state: searchParams.get('state')!,
      redirect_uri:  searchParams.get('redirect_uri')!,
      scope:         searchParams.get('scope')!,
      token: localStorage.getItem('token')!
    });
  },[searchParams])

    return (
      <form onSubmit={authorize}>
        <button type="submit">Authorize</button>
      </form>
    );
  }