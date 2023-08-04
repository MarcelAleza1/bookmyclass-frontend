import { useEffect, useState } from 'react';
import apiCalls from '../services/api.js';
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
            console.log(profileInfo.userProfile);
            setFirstName(profileInfo?.userProfile.firstName);
            setLastName(profileInfo?.userProfile.lastName);
            setEmail(profileInfo?.userProfile.email);
            setLoading(false)
        };

        getProfile();
        setProfileError(true);
    }, [token]);

    if (loading) return <>Loading</>
    if (profileError) return <div> Error with profile, Please <a className='text-blue-600' href='/login'>Login</a>Login again</div>
    return < div className="mt-5 mx-5">
        <h1>Welcome to your profile</h1>
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
        </table>

    </div>
}