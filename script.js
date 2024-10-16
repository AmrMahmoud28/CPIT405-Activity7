const apiKey = '22de28658d704cc4b2a121143241610'; // This should be secret :)

const cityInput = document.getElementById('cityInput');
const weatherData = document.querySelector('.weatherData');

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetchWeatherData(cityInput.value.trim().toLowerCase());
        cityInput.value = "";
    }
});

const fetchWeatherData = async (city) =>{
    try {
        weatherData.innerHTML = `<h2>Loading...</h2>`;
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        weatherData.innerHTML = `<h2 id='errorMessage'>${error.message}</h2>`;
    }
}

const displayWeatherData = (data) =>{
    const { location, current } = data;

    weatherData.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <h3>Condition: ${current.condition.text}</h3>
        <h3>Temperature: ${current.temp_c}°C</h3>
        <h3>Humidity: ${current.humidity}%</h3>
        <h3>Wind Speed: ${current.wind_kph} km/h</h3>
    `;
}