let apiKey = "28933cea050d87745f7a78373b5af88a";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

let searchInput = document.getElementById("search_input");
let searchButton = document.getElementById("search_btn");

let darkModeBtn = document.getElementById("darkMode_btn");
let lightModeBtn = document.getElementById("lightMode_btn");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
});

lightModeBtn.addEventListener("click", () => {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
});

let weatherData = async (city) => {
    let response = await fetch(forecastApiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    let forecastContainer = document.getElementById("forecast_container");
    forecastContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        let dayData = data.list[i * 8];
        let temp = Math.round(dayData.main.temp);
        let description = dayData.weather[0].description;
        let iconCode = dayData.weather[0].icon;
        let dayName = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });

        forecastContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                <div class="card future-weather-card mx-auto">
                    <div class="card-body text-center">
                        <h5 class="card-title">${dayName}</h5>
                        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon"
                            class="weather-icon mb-2">
                        <p class="card-text">${temp}°C</p>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            </div>`;
    }
};

async function check(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    document.querySelector('.card-title').innerHTML = data.name;
    let temperature_value = Math.round(data.main.temp);
    document.querySelector('.temp_display').innerHTML = `${temperature_value}°C`;
    document.querySelector('.card-text').innerHTML = data.weather[0].description;

    let weatherImg = document.getElementById("weatherImg");
    weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    await weatherData(city);
}

searchButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        let city = searchInput.value;
        await check(city);
    } catch {
        alert("Enter city name correctly");
    }
});
