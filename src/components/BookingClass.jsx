import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../contexts/LoginContext';
import Alert from '../common/Alert';
import { Link } from 'react-router-dom';
import { Loader } from '../common/Loader';

export const BookingClass = ({ userID }) => {
    const [classes, setClasses] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const [warning, showWarning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isClassSelected, setIsClassSelected] = useState(true);//by default assume class is selected

    console.log(" userId : ", userID);

    const base_url = "https://bookmyclass.fly.dev/api/"

    useEffect(() => {
        fetchClasses();
        fetchBookings();
    }, []);

    const fetchClasses = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${base_url}classes`);
            setLoading(false);
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${base_url}bookings`);
            setLoading(false);
            setBookings([...response.data]);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleBooking = async () => {
        if (!isLoggedIn) {
            showWarning(true);
            // return;
        }
        if (!selectedClass) {
            setIsClassSelected(false);
            return;
        }
        console.log(userID);
        if (userID) {
            try {
                setLoading(true);
                await axios.post(`${base_url}bookings`, {
                    userId: userID,
                    classId: selectedClass,
                });
                setLoading(false);
                // After successful booking, update the classes and bookings
                fetchClasses();
                fetchBookings();
                setSelectedClass('');
                setIsClassSelected(true);
            } catch (error) {
                console.error('Error creating booking:', error);
            }
        }

    };
    // console.log("bookings", bookings);
    // console.log("classes", classes);
    if (loading) return <div className="flex itemx-center justify-center mt-5"> <Loader /></div>

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Class Booking Information Management</h1>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Classes</h2>
                <table class="table mt-2">
                    <thead>
                        <tr className='border'>
                            <th className='border-2 mr-2'>Class Name</th>
                            <th className='border-2 ml-2'>Sckedule</th>
                            <th className='border-2 ml-2'>Instructor Name</th>
                            <th className='border-2 ml-2'>Available Seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((c) => (
                            <tr className='border-2' key={c._id}>

                                <td className="mb-2 border-2 mr-2">
                                    <span className="font-bold">{c.name}</span>
                                </td>
                                <td className="mb-2 border-2 mr-2">
                                    {c.schedule}
                                </td>
                                <td className="mb-2 border-2 mr-2">{c.instructor}</td>
                                <td className="mb-2 border-2 mr-2"> {c.availableSeats}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Bookings</h2>
                <table class="table mt-2">
                    <thead>
                        <tr className='border'>
                            <th className='border-2 mr-2'>Student Name</th>
                            <th className='border-2 ml-2'>Class Name</th>
                            <th className='border-2 ml-2'>Booking Date</th>
                            <th className='border-2 ml-2'>Student Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr className='border-2' key={b._id}>

                                <td className="mb-2 border-2 mr-2">
                                    <span className="font-bold">{b.user.firstname + ' ' + b.user.lastname}</span>
                                </td>
                                <td className="mb-2 border-2 mr-2">
                                    {b.class.name}
                                </td>
                                <td className="mb-2 border-2 mr-2"> {b.bookingDate.slice(0, 10)}</td>
                                <td className="mb-2 border-2 mr-2">
                                    {b.user.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <label htmlFor="classSelect" className="block font-bold mb-2">
                    Select a class to book:
                </label>
                <div className='max-w-md'>
                    <select
                        id="classSelect"
                        className="block w-full p-2 border border-gray-300 rounded "
                        value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setIsClassSelected(true);
                        }}
                    >
                        <option value="">Select a class</option>
                        {classes.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex'>
                    <button
                        className="mt-5 mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleBooking}
                    >
                        Book Class
                    </button>
                    {warning ? <>
                        <button className="bg-red-400 text-white text-center px-2 mt-5 flex items-center mr-2" onClick={() => { showWarning(false) }}>
                            <Link to={"/login"} className="font-bold">Please Login to book a class</Link>
                        </button>
                    </> : null}
                </div>
                {!isClassSelected ? <div className="bg-red-400 text-white text-center px-2 mt-5 flex items-center w-[285px]" onClick={() => { showWarning(false) }}>
                        Please select the class and proceed.
                    </div> : null}
            </div>
        </div>
    );
};