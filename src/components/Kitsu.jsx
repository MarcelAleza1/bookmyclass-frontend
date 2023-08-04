import { useEffect, useState } from "react"
import { Loader } from "../common/Loader";
export const Kitsu = () => {

    const kitsuBaseApi = 'https://kitsu.io/api/edge';
    //const aniRrl = 'https://kitsu.io/api/edge/trending/anime'
    const [loading, setLoading] = useState(false);
    const [trendingAnime, setTrendingAnime] = useState([])
    useEffect(() => {
        
        const kitsuCall = async () => {
            let response;
            try {
                setLoading(true)
                response = await fetch(`${kitsuBaseApi}/trending/anime`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "GET",
                });
console.log("running 1");
                response = await response.json();
               console.log("response: ", response);
                
                setTrendingAnime([...response?.data]);
                // console.log("running 2");
                // console.log("igngggjmgg");
                // console.log("trending: ",trendingAnime);
                setLoading(false);
            } catch (e) {
                return e;
            }
        }
        kitsuCall();

    }, []);

    if (loading) return <div className="flex itemx-center justify-center mt-5"> <Loader /></div>

    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-2">
                {
                    trendingAnime?.map((anime, idx) => {
                        return (
                            <div class="max-w-sm rounded overflow-hidden shadow-lg mb-5" key={idx}>
                                <img class="w-full" src={anime.attributes.coverImage.large} alt="Sunset in the mountains" />
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{anime.attributes.canonicalTitle}</div>
                                    <p class="text-gray-700 text-base">
                                    {anime.attributes.description.slice(0,200)} etc.
                                    </p>
                                </div>
                                <div class="px-6 pt-4 pb-2">
                                    {anime.attributes.titles.en?  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{anime.attributes.titles.en}</span>:<></> }
                                  {anime.attributes.titles.en_jp?<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{anime.attributes.titles.en_jp}</span>: <></> }
                                   {anime.attributes.titles.ja_jp?  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{anime.attributes.titles.ja_jp}</span>: <></> } 
                                   
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}