export default async function SendCodeRequest(params:
    {
        req_url: string,
        response_type:string,
        client_id:string,
        state:string,
        redirect_uri:string,
        scope:string,
        token: string,
    })
{
    const url = `${params.req_url}?response_type=${params.response_type}&client_id=${params.client_id}&state=${params.state}&redirect_uri=${params.redirect_uri}&scope=${params.scope}`;
    try{
        //const token = localStorage.getItem('token');
        await fetch(url,
        {
          headers:{"Authorization":`Bearer ${params.token}`},
          redirect: "follow",
        })
        .then((res)=>{
        if (res.redirected) {
          window.location.href = res.url;
        }
        console.log(res)})
    } 
      catch (error) {
        console.error(error);
      }
}