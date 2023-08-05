import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const BookingClass = () => {
    const [classes, setClasses] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    const base_url = "https://bookmyclass.fly.dev/api/"

    useEffect(() => {
        fetchClasses();
        fetchBookings();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get(`${base_url}classes`);
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${base_url}bookings`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleBooking = async () => {
        if (!selectedClass) {
            return;
        }

        try {
            await axios.post(`${base_url}bookings`, {
                userId: '1', //To be changed
                classId: selectedClass,
            });
            // After successful booking, update the classes and bookings
            fetchClasses();
            fetchBookings();
            setSelectedClass('');
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Class Booking Information Management</h1>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Classes</h2>
                <ul>
                    {classes.map((c) => (
                        <li key={c._id} className="mb-2">
                            <span className="font-bold">{c.name}</span> - {c.schedule} - {c.instructor} - Available Seats:{' '}
                            {c.availableSeats}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Bookings</h2>
                <ul>
                    {bookings.map((b) => (
                        <li key={b._id} className="mb-2">
                            User ID: {b.user} - Class ID: {b.class} - Booking Date: {b.bookingDate}
                        </li>
                    ))}
                </ul>
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
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">Select a class</option>
                        {classes.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleBooking}
                >
                    Book Class
                </button>
            </div>
        </div>
    );
};