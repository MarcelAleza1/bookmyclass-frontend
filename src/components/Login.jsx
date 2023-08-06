import { useContext, useState } from 'react';
import { Navigate } from "react-router-dom";
import apiCalls from '../services/api.js';
import { LoginContext } from '../contexts/LoginContext.js';
import { Loader } from '../common/Loader.jsx';
export const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedId, setLoggedIn] = useState(false);
  const {isLoggedIn,setIsLoggedIn} = useContext(LoginContext);
  const LoginApi = async () => {
    var serverResponse;
    setLoading(true);
    serverResponse = await apiCalls.loginUser(email, password);
    setLoading(false);
      //console.log("serverResponse: ",serverResponse);
    if(serverResponse.status===200){
      setLoggedIn(true);
      setIsLoggedIn(true)
    } else {
      setLoginError(true);
    }
    serverResponse = await serverResponse.json();
    // if (serverResponse.error) {
    //   setLoginError(true);
    // } 
    sessionStorage.setItem('token', serverResponse.token);
    console.log(serverResponse);
  }
  console.log("loginError: ", loginError, "loading", loading);
  return <>
    <section className="w-full">
      {!loggedId ? <div className="App mt-5">
        <p className='text-red-600'>{loginError ? <>Invalid Credentials Please try again</> : <></>}</p>
        <span className="mr-2">Email</span>
        <div className='input-container my-3 '>

          <input id='email'
            name='email'
            type='text'
            placeholder='Email'
            className=' border-0 px-2'
            style={{ height: "50px", backgroundColor: "#F3F3F3" }}
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginError(false);
            }}
          >
          </input>
        </div>
        <span className=" mt-2">Password</span>
        <div>

          <input id='password'
            name='Password'
            type='password'
            placeholder='Password'
            className='w-100 border-0 px-2'
            style={{ height: "50px", backgroundColor: "#F3F3F3" }}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginError(false);
            }}
          >
          </input>

        </div>

        <button type='submit'
          className={`w-[200px] border-0 my-3 px-3 text-white  h-[50px] ${loading? "bg-cyan-600": "bg-[#6237DE]"}`}
          // style={{ height: "50px", backgroundColor: "#6237DE" }}
          disabled={loading?true:false}
          onClick={() => { LoginApi() }}
        >Login</button>
        {loading ?  <div className="flex itemx-center justify-center mt-5"> <Loader /></div>: <></>}
        <p>Don't have an account? Please <a href='/register' className='text-blue-600'>Register</a></p>
      </div> :
        <>
        {  <Navigate to="/" replace={true} />}
        </>}

    </section>
  </>
}