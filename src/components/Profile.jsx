import { useEffect, useState } from 'react';
import apiCalls from '../services/api.js';
import { Link } from 'react-router-dom';
import { Loader } from '../common/Loader.jsx';
import CreateClass from './CreateClass.jsx';
export const Profile = () => {
    const token = sessionStorage.getItem("token");
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileError, setProfileError] = useState(false);
    useEffect(() => {
        const getProfile = async () => {
            setLoading(true);
            const apiResponse = await apiCalls.userProfile(token);
            if (apiResponse.status === 200) {
                setProfileError(false);
            }
            else {
                setProfileError(true);
            }
            const profileInfo = await apiResponse.json();
            setLoading(false);
            setFirstName(profileInfo?.userProfile?.firstName);
            setLastName(profileInfo?.userProfile?.lastName);
            setEmail(profileInfo?.userProfile?.email);
            setLoading(false)
        };

        getProfile();
        // setProfileError(true);
    }, [token]);

    if (loading) return <div className="flex itemx-center justify-center mt-5"> <Loader /></div>
    if (profileError) return <div className='mx-5'> Error while loading your profile, Please <Link className='text-blue-600' to={'/login'}>Login</Link> again</div>
    return(
    < div className="mt-5 mx-5">
        <CreateClass />
        {/* <h1>Welcome to your profile</h1>
        <table class="table mt-2">
            <thead>
                <tr className='border'>
                    <th className='border mr-2'>FirstName</th>
                    <th className='border mr-2'>LastName</th>
                    <th className='border mr-2'>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr className='border'>
                    <td className='border mr-2'>{firstName}</td>
                    <td className='border mr-2'>{lastName}</td>
                    <td className='border mr-2'>{email}</td>
                </tr>
            </tbody>
        </table> */}
    </div>
    )
}