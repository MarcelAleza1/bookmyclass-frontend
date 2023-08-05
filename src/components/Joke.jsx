import { useEffect, useState } from "react"
import { Loader } from "../common/Loader";

export const Joke = () => {
    const [loading, setLoading] = useState(false);
    const jokeApiUrl = 'https://official-joke-api.appspot.com/jokes/ten';
    const [jokes, setJokes] = useState([])

    useEffect(() => {
        setLoading(true)
        const jokeApiCall = async () => {
            let response;
            try {
                response = await fetch(`${jokeApiUrl}`, {
                    method: "GET",
                });
                const jokes = await response.json();
                // console.log(jokes);
                setJokes([...jokes]);
                setLoading(false);
            } catch (e) {
                return e;
            }
        }
        jokeApiCall();

    }, []);

    if (loading) return <div className="flex itemx-center justify-center mt-5"> <Loader /></div>
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  mx-2">
            {
                jokes.map((joke, idx) => {
                    return (
                        <div className=" flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-2" key={idx}>
                            {/* <div className=""> */}
                            <div class="pt-5 px-5 pb-2">
                                <p><span className="font-bold text-md"> Setup: </span> {joke.setup}</p>
                            </div>
                            <div className="px-5 pt-2 pb-5">
                                <p><span className="font-bold text-md"> PuchLine: </span>  {joke.punchline}</p>
                            </div>
                            {/* </div> */}
                            <div className="mt-auto">
                                {joke.type ? <span className="mx-5 font-bold text-md mt-auto inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{joke.type.toUpperCase()}</span> : <></>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}