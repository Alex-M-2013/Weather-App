const container = document.getElementById("container");

const url = new URL("https://weather-proxy.alexmach01.workers.dev/");
getUserLocation();

function getUserLocation() {
    if (!navigator.geolocation) {
        console.error("Geolocation isn't supported by this browser.");
        url.searchParams.set("q", "London,uk");
        fetchWeather();
        return;
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coordinates = position.coords;
                url.searchParams.set("lat", coordinates.latitude);
                url.searchParams.set("lon", coordinates.longitude);
                fetchWeather();
                return;
            },
            (error) => {
                console.error(`ERROR ${error.code}: ${error.message}`);
                url.searchParams.set("q", "London,uk");
                fetchWeather();
                return;
            },

            {
                maximumAge: 0,
            },
        );
    }
}

function fetchWeather() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const cityName = document.createElement("h1");
            cityName.textContent = `City: ${data.name}`;

            const weatherCard = document.createElement("div");
            weatherCard.id = "card";

            const weatherIcon = document.createElement("img");
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            weatherIcon.alt = `${capitalise(data.weather[0].description)}`;

            const weatherDescription = document.createElement("p");
            weatherDescription.textContent = `${capitalise(data.weather[0].description)}`;

            const temperature = document.createElement("p");
            temperature.innerHTML = `<strong>Temperature: </strong>${Number(data.main.temp.toFixed(1))}°C`;

            const temperatureFeelsLike = document.createElement("p");
            temperatureFeelsLike.innerHTML = `<strong>Feels Like: </strong>${Number(data.main.feels_like.toFixed(1))}°C`;

            const humidity = document.createElement("p");
            humidity.innerHTML = `<strong>Humidity: </strong>${data.main.humidity}%`;

            const windSpeed = document.createElement("p");
            windSpeed.innerHTML = `<strong>Wind Speed: </strong>${data.wind.speed} m/s`;

            container.appendChild(cityName);
            weatherCard.append(weatherIcon, weatherDescription, temperature, temperatureFeelsLike, humidity, windSpeed);
            container.appendChild(weatherCard);
        })
        .catch((error) => console.error(`Could not fetch weather data: ${error}`));
}
