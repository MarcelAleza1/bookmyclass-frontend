import { useEffect, useState } from "react";
import { Joke } from "./Joke"
import { Kitsu } from "./Kitsu"
import CreateClass from "./CreateClass";
import { BookingClass, ClassInfo } from "./BookingClass";

export const Home = () => {
    const [showAnime, setShowAnime] = useState(false)

    useEffect(() => {
        setTimeout(() => { setShowAnime(true); }, 5000);
    }, [showAnime]);
    const [classes, setClasses] = useState([]);
    const handleClassCreated = (newClass) => {
        setClasses([...classes, newClass]);
      };
    return (
        <>
        {/* <CreateClass onClassCreated={handleClassCreated} />  */}
         <BookingClass />
            {/* <Joke />
            <div className="ml-3 mb-2">Displaying data from Kitsu API</div>
            {showAnime ? <Kitsu /> : null} */}

        </>
    )
}