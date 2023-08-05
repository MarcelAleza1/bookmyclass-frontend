import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
export const Logout = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    useEffect(() => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
    }, []);

    return (
        <div className="ml-2">
            <h1>Logout Successfully</h1>
            <h2>You can navigate to <Link to={"/"} className="text-blue-600">Home </Link> or <Link className="text-blue-600" to={"/login"}>Login</Link> to see your profile</h2>
            <Navigate to={"/"} replace={true} />
        </div>
    )
}