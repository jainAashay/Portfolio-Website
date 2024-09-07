import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
function Test() {
    const [data, setData] = useState(null); // State to store the API response
    useEffect(() => {
      const fetchData = async () => {
      const token = Cookies.get('login_token');
      console.log(token);
      try{
        const response = await axios.get('http://127.0.0.1:5000/get_name', {
          headers: {
            Authorization: `Bearer ${token}` // Set the Bearer token in the Authorization header
          }
        });
        if(response.status==200)
          {
             setData("Hello");
          }
          else{
            setData("Unauthored !")
         }
      }
      catch(error){
        setData("Unauthored");
      }
    };
    fetchData();
      }, []); // Empty dependency array to ensure it runs on component mount
  return (
    <div>
   {/* Render the data here */}
   <pre>{JSON.stringify(data, null, 2)}</pre>
   </div>
  )
}

export default Test