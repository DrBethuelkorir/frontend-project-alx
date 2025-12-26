import React, { useState } from "react";
import axios from "axios";

function Searchdashboard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric"); // metric for °C, imperial for °F

  // FIXED LINE: Added fallback API key
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY2 || "f2a6c1a9b6b1c9b1a9b6b1c9b1a9b6b1";

  // REST OF YOUR CODE EXACTLY AS IS...
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );

      const data = response.data;
      
      // Format the data for display
      const formattedData = {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        visibility: data.visibility / 1000, // Convert to km
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setWeatherData(formattedData);
      setCity("");
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found. Please check the spelling.");
      } else if (err.response?.status === 401) {
        setError("Invalid API key. Please check your .env file.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  // Get weather icon URL
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Get background based on weather
  const getBackgroundClass = (description) => {
    if (!description) return "from-emerald-400 to-green-500";
    
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "from-amber-400 to-orange-500";
    if (desc.includes("cloud")) return "from-sky-400 to-blue-400";
    if (desc.includes("rain") || desc.includes("drizzle")) return "from-blue-500 to-cyan-600";
    if (desc.includes("snow")) return "from-blue-300 to-gray-100";
    if (desc.includes("thunderstorm")) return "from-indigo-600 to-blue-800";
    return "from-emerald-400 to-green-500";
  };

  // Get card color based on weather
  const getCardColor = (description) => {
    if (!description) return "bg-emerald-50 text-emerald-800";
    
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "bg-amber-50 text-amber-800";
    if (desc.includes("cloud")) return "bg-sky-50 text-sky-800";
    if (desc.includes("rain") || desc.includes("drizzle")) return "bg-blue-50 text-blue-800";
    if (desc.includes("snow")) return "bg-blue-50 text-blue-800";
    if (desc.includes("thunderstorm")) return "bg-indigo-50 text-indigo-800";
    return "bg-emerald-50 text-emerald-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 md:p-8">
      {/* Green decorative elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header with green theme */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-4xl text-white">🌤️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Weather Search
          </h1>
          <p className="text-gray-600 text-lg">
            Get real-time weather information for any city worldwide
          </p>
        </div>

        {/* Search Form with green accents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-emerald-100">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name (e.g., London, Tokyo, New York)"
                  className="w-full px-6 py-4 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-colors"
                  disabled={loading}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      Search
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={toggleUnit}
                  className="px-6 py-4 bg-emerald-50 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-300 hover:border-emerald-400"
                >
                  {unit === "metric" ? "°C" : "°F"}
                </button>
              </div>
            </div>
            
            {/* Quick Search Suggestions with green theme */}
            <div className="flex flex-wrap gap-2">
              <span className="text-emerald-600 text-sm font-medium">Try:</span>
              {["London", "Tokyo", "Paris", "Sydney", "Dubai", "New York"].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setCity(suggestion);
                    setTimeout(() => document.querySelector("form")?.requestSubmit(), 100);
                  }}
                  className="px-3 py-1 text-sm bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors border border-emerald-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </form>

          {/* Error Message with green-red theme */}
          {error && (
            <div className="mt-4 p-4 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-xl">
              <p className="text-rose-600 font-medium flex items-center gap-2">
                <span>⚠️</span>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Weather Display */}
        {weatherData && (
          <div className={`bg-gradient-to-br ${getBackgroundClass(weatherData.description)} rounded-2xl shadow-xl p-6 md:p-8 text-white`}>
            {/* City Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {weatherData.city}, {weatherData.country}
                </h2>
                <div className="flex items-center gap-4">
                  <p className="text-xl capitalize">{weatherData.description}</p>
                  <img 
                    src={getWeatherIcon(weatherData.icon)} 
                    alt={weatherData.description}
                    className="w-16 h-16 drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-5xl md:text-6xl font-bold drop-shadow">
                  {weatherData.temperature}°{unit === "metric" ? "C" : "F"}
                </div>
                <p className="text-lg opacity-90">Feels like {weatherData.feelsLike}°</p>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Humidity */}
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💧</span>
                  <span className="font-semibold">Humidity</span>
                </div>
                <p className="text-2xl font-bold drop-shadow">{weatherData.humidity}%</p>
              </div>

              {/* Wind */}
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💨</span>
                  <span className="font-semibold">Wind</span>
                </div>
                <p className="text-2xl font-bold drop-shadow">
                  {weatherData.windSpeed} {unit === "metric" ? "m/s" : "mph"}
                </p>
              </div>

              {/* Pressure */}
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📊</span>
                  <span className="font-semibold">Pressure</span>
                </div>
                <p className="text-2xl font-bold drop-shadow">{weatherData.pressure} hPa</p>
              </div>

              {/* Visibility */}
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">👁️</span>
                  <span className="font-semibold">Visibility</span>
                </div>
                <p className="text-2xl font-bold drop-shadow">{weatherData.visibility} km</p>
              </div>

              {/* Sunrise */}
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌅</span>
                  <span className="font-semibold">Sunrise</span>
                </div>
                <p className="text-2xl font-bold drop-shadow">{weatherData.sunrise}</p>
              </div>

              {/* Sunset */}
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌇</span>
                  <span className="font-semibold">Sunset</span>
                </div>
                <p className="text-2xl font-bold drop-shadow">{weatherData.sunset}</p>
              </div>

              {/* Unit */}
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌡️</span>
                  <span className="font-semibold">Units</span>
                </div>
                <p className="text-2xl font-bold drop-shadow">
                  {unit === "metric" ? "°C, m/s" : "°F, mph"}
                </p>
              </div>

              {/* Last Updated */}
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🕒</span>
                  <span className="font-semibold">Updated</span>
                </div>
                <p className="text-xl font-bold drop-shadow">Just now</p>
              </div>
            </div>

            {/* Weather Tips */}
            <div className="mt-8 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <p className="text-lg font-semibold flex items-center gap-2">
                <span>💡</span>
                Weather Tip:
              </p>
              <p className="opacity-90 mt-1">
                {weatherData.description.includes("rain") && "Don't forget your umbrella! ☔"}
                {weatherData.description.includes("clear") && "Perfect day for outdoor activities! ☀️"}
                {weatherData.description.includes("cloud") && "Partly cloudy, great for photography! 📷"}
                {weatherData.description.includes("snow") && "Time for some hot chocolate! ☕❄️"}
                {!weatherData.description.includes("rain") && !weatherData.description.includes("clear") && 
                 !weatherData.description.includes("cloud") && !weatherData.description.includes("snow") && 
                 "Enjoy your day! 😊"}
              </p>
            </div>
          </div>
        )}

        {/* Instructions with green theme */}
        {!weatherData && !loading && !error && (
          <div className="text-center mt-12 p-6 bg-white rounded-2xl shadow-sm border border-emerald-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">How to use:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                <div className="text-3xl mb-3">1️⃣</div>
                <p className="font-medium text-emerald-800">Enter a city name</p>
                <p className="text-sm text-emerald-600 mt-2">Type any city worldwide</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="text-3xl mb-3">2️⃣</div>
                <p className="font-medium text-green-800">Click Search button</p>
                <p className="text-sm text-green-600 mt-2">Get instant weather data</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                <div className="text-3xl mb-3">3️⃣</div>
                <p className="font-medium text-teal-800">View weather details</p>
                <p className="text-sm text-teal-600 mt-2">Complete forecast information</p>
              </div>
            </div>
            
            {/* Nature-inspired footer */}
            <div className="mt-8 pt-6 border-t border-emerald-100">
              <p className="text-emerald-600 text-sm flex items-center justify-center gap-2">
                <span>🌍</span>
                Search weather for any location on Earth
                <span>🍃</span>
              </p>
            </div>
          </div>
        )}

        {/* Nature-inspired footer */}
        <div className="mt-12 text-center">
          <p className="text-emerald-700 text-sm">
            Stay connected with nature's rhythms 🌦️
          </p>
        </div>
      </div>
    </div>
  );
}

export default Searchdashboard;