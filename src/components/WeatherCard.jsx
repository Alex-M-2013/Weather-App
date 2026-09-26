import "../styles/WeatherCard.css";
import { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { capitalise } from "../utils/helper";

export const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const url = new URL("https://weather-proxy.alexmach01.workers.dev/");

        function fetchWeather(url) {
            fetch(url, { headers: { "App-Token": import.meta.env.APP_TOKEN } })
                .then((r) => {
                    if (!r.ok) throw new Error(`Request failed with status ${r.status}`);
                    return r.json();
                })
                .then((data) => setWeatherData(data))
                .catch((error) => {
                    Toastify({
                        text: "Could not fetch weather data. See console (F12) for more details.",
                        duration: 4500,
                        style: {
                            background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
                            borderRadius: "8px",
                        },
                    }).showToast();
                    throw new Error(error);
                });
        }

        if (!navigator.geolocation) {
            console.error("Geolocation isn't supported by this browser.");
            url.searchParams.set("q", "London,uk");
            fetchWeather(url);
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coordinates = position.coords;
                    url.searchParams.set("lat", coordinates.latitude);
                    url.searchParams.set("lon", coordinates.longitude);
                    fetchWeather(url);
                },
                (error) => {
                    console.error(`ERROR ${error.code}: ${error.message}`);
                    url.searchParams.set("q", "London,uk");
                    fetchWeather(url);
                },
                {
                    maximumAge: 900000,
                },
            );
        }
    }, []);

    return (
        <>
            {weatherData && (
                <>
                    <h1>City: {weatherData.name}</h1>
                    <div id="weather-card">
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt={capitalise(weatherData.weather[0].description)} />
                        <p>{capitalise(weatherData.weather[0].description)}</p>
                        <p>
                            <strong>Temperature: </strong>
                            {Number(weatherData.main.temp.toFixed(1))}°C
                        </p>
                        <p>
                            <strong>Feels Like: </strong>
                            {Number(weatherData.main.feels_like.toFixed(1))}°C
                        </p>
                        <p>
                            <strong>Humidity: </strong>
                            {weatherData.main.humidity}%
                        </p>
                        <p>
                            <strong>Wind Speed: </strong>
                            {weatherData.wind.speed} m/s
                        </p>
                    </div>
                </>
            )}
        </>
    );
};
