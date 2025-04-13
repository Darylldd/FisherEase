 document.addEventListener('DOMContentLoaded', function() {
      const lat = '13.4139';
      const lon = '121.0561';
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const forecastCards = document.getElementById('forecast-cards');
          const times = data.daily.time;
          const maxTemps = data.daily.temperature_2m_max;
          const minTemps = data.daily.temperature_2m_min;
          const weatherCodes = data.daily.weathercode;

          times.forEach((time, index) => {
            const date = new Date(time);
            const dayName = date.toLocaleDateString(undefined, { weekday: 'long' });
            const maxTemp = maxTemps[index];
            const minTemp = minTemps[index];
            const weatherCode = weatherCodes[index];
            const weatherDescription = getWeatherDescription(weatherCode);
            const weatherIcon = getWeatherIcon(weatherCode);

            const card = document.createElement('div');
            card.className = 'forecast-card';

            card.innerHTML = `
              <div class="card bg-light">
                <div class="card-body">
                  <div class="weather-icon">${weatherIcon}</div>
                  <h5 class="card-title">${dayName}</h5>
                  <p class="card-text">Max: ${maxTemp}°C, Min: ${minTemp}°C</p>
                  <p class="card-text">Weather: ${weatherDescription}</p>
                </div>
              </div>
            `;
            forecastCards.appendChild(card);
          });

          // Make the forecast cards visible after they are loaded
          forecastCards.style.opacity = 1;
        })
        .catch(error => console.error('Error fetching weather data:', error));

      function getWeatherDescription(code) {
        const weatherMapping = {
          0: 'Clear sky',
          1: 'Mainly clear',
          2: 'Partly cloudy',
          3: 'Overcast',
          45: 'Fog',
          48: 'Depositing rime fog',
          51: 'Light drizzle',
          53: 'Moderate drizzle',
          55: 'Dense drizzle',
          56: 'Light freezing drizzle',
          57: 'Dense freezing drizzle',
          61: 'Slight rain',
          63: 'Moderate rain',
          65: 'Heavy rain',
          66: 'Light freezing rain',
          67: 'Heavy freezing rain',
          71: 'Slight snowfall',
          73: 'Moderate snowfall',
          75: 'Heavy snowfall',
          77: 'Snow grains',
          80: 'Slight rain showers',
          81: 'Moderate rain showers',
          82: 'Violent rain showers',
          85: 'Slight snow showers',
          86: 'Heavy snow showers',
          95: 'Thunderstorm',
          96: 'Thunderstorm with slight hail',
          99: 'Thunderstorm with heavy hail'
        };
        return weatherMapping[code] || 'Unknown';
      }

      function getWeatherIcon(code) {
        const iconMapping = {
          0: '🌞', 1: '🌤', 2: '🌥', 3: '☁️',
          45: '🌫', 48: '🌫', 51: '🌧', 53: '🌧',
          55: '🌧', 56: '🌨', 57: '🌨', 61: '🌦',
          63: '🌦', 65: '🌧', 66: '🌨', 67: '🌨',
          71: '❄️', 73: '❄️', 75: '❄️', 77: '❄️',
          80: '🌧', 81: '🌧', 82: '🌧', 85: '❄️',
          86: '❄️', 95: '🌩', 96: '🌩', 99: '🌩'
        };
        return iconMapping[code] || '❓';
      }
    });