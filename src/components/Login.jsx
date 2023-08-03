import { useState } from 'react';
import apiCalls from '../services/api.js';
export const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)
  const LoginApi = async () => {
    var serverResponse;
    serverResponse=await apiCalls.loginUser(email, password)
    console.log(serverResponse);
  }
  return <>
    <section className="w-full">
      <div className="App mt-5">
        <span className="mr-2">Email</span>
        <div className='input-container my-3 '>

          <input id='email'
            name='email'
            type='text'
            placeholder='Email'
            className=' border-0 px-2'
            style={{ height: "50px", backgroundColor: "#F3F3F3" }}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          >
          </input>

        </div>

        <button type='submit'
          className='w-[200px] border-0 my-3 px-3 text-white'
          style={{ height: "50px", backgroundColor: "#6237DE" }}
          onClick={() => { LoginApi() }}
        >Login</button>
      </div>
    </section>
  </>
}