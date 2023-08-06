import React, { useContext, useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { LoginContext } from '../contexts/LoginContext';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const Links = [
        { name: "HOME", link: "/" },
        { name: "JOKES", link: "/joke" },
        { name: "KITSU", link: "/kitsu" }
    ];
    let [open, setOpen] = useState(false);

    return (
        <div className='shadow-md w-full sticky top-0 left-0 mb-5 '>
            <div className='md:flex items-center justify-between bg-white solide py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                    <span>BookMyClass</span>
                </div>
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                    {
                        open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                    }
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                    {
                        Links.map((link, idx) => (
                            <li className='md:ml-8 md:my-0 my-7 font-semibold' key={idx}>
                                <Link to={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</Link>
                            </li>))
                    }
                    {isLoggedIn ? <div>
                        <Link to={"/profile"} className='inline-block text-sm hover:text-blue-400 px-4 py-2 leading-none border rounded border-black mt-4 lg:mt-0'>Profile</Link>
                        <Link to={"/logout"} className="inline-block text-sm hover:text-blue-400 px-4 py-2 mr-2 md:ml-2 leading-none border rounded border-black mt-4 lg:mt-0">Logout</Link>
                    </div> :
                        <div>
                            <Link to={"/login"} className="inline-block text-sm hover:text-blue-400 px-4 py-2 mr-2 md:ml-2 leading-none border rounded border-black mt-4 lg:mt-0">Login</Link>
                            <Link to={"/register"} className="inline-block text-sm hover:text-blue-400 px-4 py-2 leading-none border rounded border-black mt-4 lg:mt-0">Register</Link>
                        </div>}
                    <div className='border border-b md:hidden my-2 mr-2'></div>
                </ul>
            </div>
        </div>
    )
}