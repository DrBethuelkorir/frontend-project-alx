import Axios from "axios";
import { useState, useEffect } from "react";

function Home() {
  
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(import.meta.env.VITE_WEATHER_API_URL).then((res) => {
      console.log(res.data);
      setLocation(res.data.nearest_area[0].areaName[0].value);
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="min-h-screen w-full bg-gradient-to-b from-green-200 to-blue-200">
        <div className="body flex justify-center items-center min-h-screen p-5">
          <div className="container bg-green-100 p-4 m-4 rounded-lg shadow-lg w-full max-w-6xl">
            {/* REMOVED: <Navbar /> */}
            
            <div className="welcome-message text-center mt-8">
              <h1 className="text-3xl font-bold mb-4">Welcome to the Weather Dashboard</h1>
              <p className="text-lg">
                You are now in <strong className="text-blue-600">{location}</strong> city, the current weather is:
              </p>
            </div>
            
            <div className="weather-display flex justify-center space-x-8 mt-12 flex-wrap">
              {loading ? (
                // Show loading message centered
                <div className="w-full text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></div>
                  <p className="text-lg text-blue-600">Loading weather data...</p>
                </div>
              ) : (
                // Show all three weather cards when not loading
                <>
                  <div className="temperature-display text-center bg-blue-50 p-6 rounded-lg shadow-md m-2 min-w-[200px]">
                    <img src="/temperature-icon.png" alt="temperature icon" className="w-16 h-16 mx-auto mb-2" />
                    <h2 className="text-2xl font-semibold">25&#8451;</h2>
                  </div>
                  
                  <div className="humidity-display text-center bg-green-50 p-6 rounded-lg shadow-md m-2 min-w-[200px]">
                    <img src="/humidity-icon.png" alt="Humidity image" className="w-16 h-16 mx-auto mb-2" />
                    <h2 className="text-2xl font-semibold">10g/m³</h2>
                  </div>
                  
                  <div className="wind-speed-display text-center bg-gray-50 p-6 rounded-lg shadow-md m-2 min-w-[200px]">
                    <img src="/wind-icon.png" alt="Wind speed image" className="w-16 h-16 mx-auto mb-2" />
                    <h2 className="text-2xl font-semibold">15km/h</h2>
                  </div>
                </>
              )}
            </div>
            
            <p className="text-center mt-8">
              Do you want to search for specific location? 
              <a href="" className="text-blue-500 hover:text-blue-700 ml-1">click here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;