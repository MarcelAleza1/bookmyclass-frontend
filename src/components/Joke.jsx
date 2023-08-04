import { useEffect, useState } from "react"

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
console.log("Jokes: ",jokes);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-2">
            {
                jokes.map((joke)=> {
                    return (
                        <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-2">
                        <div class="p-6">
                        <h1 className="ml-auto text-green-600">Id: {joke.id}</h1>
                            <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                Type: {joke.type.toUpperCase()}
                            </h5>
                            <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Setup: {joke.setup}
                            </p>
                        </div>
                        <div class="p-6 pt-0">
                            <button
                                class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                data-ripple-light="true"
                            >
                                PuchLine: {joke.punchline}
                            </button>
                        </div>
                    </div> 
                    )
                })
            }
        </div>
    )
}