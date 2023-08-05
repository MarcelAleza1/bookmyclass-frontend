// src/components/CreateClass.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateClass = ({ onClassCreated }) => {
    const [name, setName] = useState('');
    const [schedule, setSchedule] = useState('');
    const [instructor, setInstructor] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const base_url = "https://bookmyclass.fly.dev/api/";

    const [classCreated, setClassCreated] = useState(false);
    const [classes, setClasses] = useState([]);

    const handleCreateClass = async () => {
        try {
            const response = await axios.post(`${base_url}classes`, {
                name,
                schedule,
                instructor,
                availableSeats: parseInt(availableSeats),
            });
            //onClassCreated(response.data);
            setClasses([...classes, response.data]);

            setClassCreated(true)
            setName('');
            setSchedule('');
            setInstructor('');
            setAvailableSeats('');
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };

    return (
        <div className="p-4">
            {classCreated ? <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Classes</h2>
                <ul>
                    {classes.map((c) => (
                        <li key={c._id} className="mb-2">
                            <span className="font-bold">{c.name}</span> - {c.schedule} - {c.instructor} - Available Seats:{' '}
                            {c.availableSeats}
                        </li>
                    ))}
                </ul>
            </div> :
                <>
                    <h1 className="text-3xl font-bold mb-4">Create Class</h1>
                    <div className="mb-4 w-max-md">
                        <label htmlFor="name" className="block font-bold mb-2">
                            Class Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="block w-full p-2 border border-gray-300 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 max-w-md">
                        <label htmlFor="schedule" className="block font-bold mb-2">
                            Schedule:
                        </label>
                        <input
                            type="text"
                            id="schedule"
                            className="block w-full p-2 border border-gray-300 rounded"
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 max-w-md">
                        <label htmlFor="instructor" className="block font-bold mb-2">
                            Instructor:
                        </label>
                        <input
                            type="text"
                            id="instructor"
                            className="block w-full p-2 border border-gray-300 rounded"
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 max-w-md">
                        <label htmlFor="availableSeats" className="block font-bold mb-2">
                            Available Seats:
                        </label>
                        <input
                            type="number"
                            id="availableSeats"
                            className="block w-full p-2 border border-gray-300 rounded"
                            value={availableSeats}
                            onChange={(e) => setAvailableSeats(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCreateClass}
                    >
                        Create Class
                    </button>
                </>}
        </div>
    );
};

export default CreateClass;
