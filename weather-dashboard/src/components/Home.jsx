import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    humidity: null,
    windspeed: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
          fetchWeatherData(latitude, longitude);
          fetchCityName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          const defaultLat = -1.28;
          const defaultLon = 36.82;
          setCoordinates({ lat: defaultLat, lon: defaultLon });
          fetchWeatherData(defaultLat, defaultLon);
          fetchCityName(defaultLat, defaultLon);
        }
      );
    } else {
      console.log("Geolocation not supported");
      const defaultLat = -1.28;
      const defaultLon = 36.82;
      setCoordinates({ lat: defaultLat, lon: defaultLon });
      fetchWeatherData(defaultLat, defaultLon);
      fetchCityName(defaultLat, defaultLon);
    }
  }, []);

  // Fetch dynamic weather data from Open-Meteo
  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const res = await Axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      );

      const { temperature, windspeed } = res.data.current_weather;

      // Find the current hour index in hourly time array
      const currentHour = new Date().getHours();
      const hourlyIndex = res.data.hourly.time.findIndex(
        (t) => new Date(t).getHours() === currentHour
      );

      const humidity = res.data.hourly.relativehumidity_2m[hourlyIndex];

      setWeatherData({
        temperature: temperature + "°C",
        humidity: humidity + "%",
        windspeed: windspeed + " km/h",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  // Fetch city name from coordinates
  const fetchCityName = async (lat, lon) => {
    try {
      const res = await Axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const city =
        res.data.address.city ||
        res.data.address.town ||
        res.data.address.village ||
        res.data.address.county ||
        "Unknown";
      setLocation(city);
    } catch (error) {
      console.error("Error fetching city name:", error);
      setLocation("Unknown");
    }
  };

  const weatherCards = [
    {
      title: "Temperature",
      value: weatherData.temperature || "...",
      icon: "🌡️",
      gradient: "from-emerald-400 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
      borderColor: "border-emerald-200",
    },
    {
      title: "Humidity",
      value: weatherData.humidity || "...",
      icon: "💧",
      gradient: "from-teal-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-100",
      borderColor: "border-teal-200",
    },
    {
      title: "Wind Speed",
      value: weatherData.windspeed || "...",
      icon: "💨",
      gradient: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      borderColor: "border-green-200",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="absolute top-10 right-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"></div>

      <div className="relative body flex justify-center items-center min-h-screen p-5">
        <div className="container bg-white/90 backdrop-blur-sm p-6 m-4 rounded-2xl shadow-xl border border-emerald-100 w-full max-w-6xl">
          {coordinates.lat && coordinates.lon && (
            <div className="text-center mb-4">
              <p className="text-sm text-emerald-600 bg-emerald-50 inline-block px-3 py-1 rounded-full">
                📍 Using coordinates: {coordinates.lat.toFixed(2)}, {coordinates.lon.toFixed(2)}
              </p>
            </div>
          )}

          <div className="welcome-message text-center mt-8 mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl text-white">🌤️</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to the Weather Dashboard
            </h1>
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200 mb-4">
              <p className="text-lg text-gray-700">
                You are now in{" "}
                <strong className="text-emerald-600 font-bold px-2 py-1 bg-emerald-50 rounded-lg">
                  {loading ? "..." : location}
                </strong>{" "}
                city
              </p>
            </div>
            <p className="text-gray-600 mt-2">Current weather conditions:</p>
          </div>

          <div className="weather-display flex justify-center gap-8 mt-12 flex-wrap">
            {loading ? (
              <div className="w-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full border border-emerald-200 mb-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
                </div>
                <p className="text-lg text-emerald-600 font-medium">Loading weather data...</p>
                <p className="text-sm text-gray-500 mt-2">Fetching your location and weather information</p>
              </div>
            ) : (
              weatherCards.map((card, index) => (
                <div
                  key={index}
                  className={`${card.bgColor} p-8 rounded-2xl shadow-lg border ${card.borderColor} min-w-[240px] transform transition-transform hover:scale-105 hover:shadow-xl`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-md`}
                    >
                      <span className="text-4xl">{card.icon}</span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{card.value}</h2>
                    <p className="text-gray-600 font-medium">{card.title}</p>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-emerald-600">Live</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
