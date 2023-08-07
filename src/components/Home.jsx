import { useContext, useEffect, useState } from "react";
import { Joke } from "./Joke"
import { Kitsu } from "./Kitsu"
import CreateClass from "./CreateClass";
import { BookingClass, ClassInfo } from "./BookingClass";
import { LoginContext } from '../contexts/LoginContext';
import apiCalls from '../services/api.js';

export const Home = () => {
    const [showAnime, setShowAnime] = useState(false)
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [profileError, setProfileError] = useState(false);
    const [userID, setUserID] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const getProfile = async () => {
            setLoading(true);
            const apiResponse = await apiCalls.userProfile(token);
            if (apiResponse.status === 200) {
                setProfileError(false);
            }
            else {
                setProfileError(true);
                setIsLoggedIn(false);
            }
            const profileInfo = await apiResponse.json();
            console.log("profileInfo: ", profileInfo);
            setUserID(profileInfo?.userProfile?._id);
            if (profileInfo?.userProfile?._id) {
                setIsLoggedIn(true);
            }

            setLoading(false);
            // setFirstName(profileInfo?.userProfile?.firstName);
            // setLastName(profileInfo?.userProfile?.lastName);
            // setEmail(profileInfo?.userProfile?.email);
        };

        getProfile();
        // setProfileError(true);
    }, [token]);


    return (
        <>
            <BookingClass userID={userID} />
        </>
    )
}