export default async function SendPostRequest(params:
    {
       req_url: string,
       data: any, 
    }) : Promise<any>
{
    let ret_data;
    try{
        await fetch(params.req_url,
          {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params.data)
          }).then((res) => res.json())
          .then((data) => {
            //console.log(data);
            //localStorage.setItem('token', data.access_token);
            ret_data=  data;
          })
        }
        catch (error) {
          console.error(error);
        }
    return ret_data;
}