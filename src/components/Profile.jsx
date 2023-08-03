import { useEffect, useState } from 'react';
import apiCalls from '../services/api.js';
export const Profile = () => {
    const token = sessionStorage.getItem("token");
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null)
    useEffect(()=>{
        const getProfile = async () => {
            const profileInfo= await apiCalls.userProfile(token);
            console.log(profileInfo);
          };
        
          getProfile();
        

    },[token])
   
    return < div className="App mt 5">
        {token ? <></> : <>Not Logged In Please <a href="/login" className="text-blue-600">Sign In </a></>}
    </div>
}