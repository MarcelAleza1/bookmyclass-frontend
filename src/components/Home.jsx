import { useEffect, useState } from "react";
import { Joke } from "./Joke"
import { Kitsu } from "./Kitsu"
import { Register } from "./Register"

export const Home = () => {
    const [showAnime, setShowAnime] = useState(false)

    useEffect(() => {
        setTimeout(() => { setShowAnime(true); }, 5000);
    }, [showAnime]);

    return (
        <>
            <Joke />
            <div className="ml-3 mb-2">Displaying data from Kitsu API</div>
            {showAnime ? <Kitsu /> : null}

        </>
    )
}