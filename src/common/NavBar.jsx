export const NavBar = () => {
    return (
        <div className="App">
            <nav class="flex items-center justify-between flex-wrap bg-white text-black p-6 sticky top-0 shadow-lg mb-3">
                <div class="flex items-center flex-shrink-0  mr-6">
                    <span class="font-semibold text-xl tracking-tight">BookMyClass</span>
                </div>
                <div class="block lg:hidden">
                    <button class="flex items-center px-3 py-2 border rounded  border-teal-400 hover:text-white hover:border-white">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-sm lg:flex-grow">
                        <a href="#" class="block mt-4 lg:inline-block lg:mt-0  mr-4">
                            Home
                        </a>
                        <a href="#" class="block mt-4 lg:inline-block lg:mt-0  mr-4">
                            Joke API
                        </a>
                        <a href="#" class="block mt-4 lg:inline-block lg:mt-0 ">
                        Kitsu API
                        </a>
                    </div>
                    <div>
                        <a href="/login" class="inline-block text-sm px-4 py-2 leading-none border rounded border-black mt-4 lg:mt-0">Login</a>
                        <a href="/register" class="inline-block text-sm px-4 py-2 leading-none border rounded border-black mt-4 lg:mt-0">Register</a>
                    </div>
                </div>
            </nav>
        </div>)
}