

const apiKey = 'dd67cf2849ae427e9a7132223240807';

function getWeather() {
    const location = document.getElementById('locationInput').value;
    const weatherData = document.getElementById('weatherData');
    const errorMessage = document.getElementById('errorMessage');

    weatherData.innerHTML = '';
    errorMessage.innerHTML = '';

    if (!location) {
        errorMessage.innerHTML = 'Please enter a location.';
        return;
    }

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found. Please enter a valid location.');
            }
            return response.json();
        })
        .then(data => {
            if (!data.forecast || !data.forecast.forecastday) {
                throw new Error('Invalid data structure');
            }

            data.forecast.forecastday.forEach((day, i) => {
                const card = document.createElement('div');
                card.className = 'weather-card';

                card.innerHTML = `
                    <div>
                        <h3>Day ${i + 1}</h3>
                        <h3>${data.location.name}</h3>
                        <p>${day.date}</p>
                        <p>${day.day.condition.text}</p>
                        <p>Temp: ${day.day.avgtemp_c}°C / ${day.day.avgtemp_f}°F</p>
                    </div>
                    <img src="${day.day.condition.icon}" alt="weather icon">
                `;

                weatherData.appendChild(card);
            });
        })
        .catch(error => {
            errorMessage.innerHTML = `Error: ${error.message}`;
        });
}

