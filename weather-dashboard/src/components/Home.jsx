function Home(){
    return(
        <div className="body flex justify-center items-center height-100vh bg-gradient-to-b from-green-200 to-blue-200 m-5 p-5 rounded-lg shadow-lg">
            <div className="container bg-green-100 p-4 m-7 rounded-lg ">
        <div className="nav text-blue-500 p-4 flex justify-center border-b border-gray-300">
            <ul className="flex space-x-4">
                <li className="hover:text-blue-700"><a href="/">Home</a></li>
                <li className="hover:text-blue-700"><a href="/about">Search</a></li>
                <li className="hover:text-blue-700"><a href="/contact">Report Bug</a></li>
            </ul>
        </div>
        <div className="welcome-message text-center mt-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Weather Dashboard</h1>
            <p className="text-lg">
                You are now in <strong className="text-blue-600">NAIROBI</strong>  city, the current weather is:
            </p>
        </div>
        <div className="weather-display flex justify-center space-x-8 mt-12">
            <div className="tempreture-display text-center bg-blue-50 p-6 rounded-lg shadow-md">
                <img src="/temperature-icon.png" alt="temperature icon" className="w-16 h-16 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold">25&#8451;</h2>
            </div>
            <div className="humidity-display text-center bg-green-50 p-6 rounded-lg shadow-md">
                <img src="/humidity-icon.png" alt="Humidity image" className="w-16 h-16 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold">10g/m³</h2>
            </div>
            <div className="wind-speed-display text-center bg-gray-50 p-6 rounded-lg shadow-md">
                <img src="/wind-icon.png" alt="Wind speed image" className="w-16 h-16 mx-auto mb-2" />
                <h2 className="text-2xl font-semibold">15km/h</h2>
            </div>
        </div>
        <p className="text-center mt-8">Do you want to search for specific location? <a href="" className="text-blue-500 hover:text-blue-700">click here</a></p>
        </div>
        </div>
    );
}
export default Home;