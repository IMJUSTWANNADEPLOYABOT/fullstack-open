import { useState, useEffect } from "react"
const apiKey = import.meta.env.VITE_WEATHER_KEY
import axios from "axios"

const Weather = ({ coords, capital }) => {

    const [weather, setWeather] = useState([])
    const lat = coords.latlng[0]
    const lon = coords.latlng[1]

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => setWeather(response.data))
    }, [lat, lon])

    return (
        <>
            {
                weather.main && (
                    <div><h2>Weather in {capital}</h2>
                        <p>Temperature {weather.main.temp} Celsius</p>

                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        />
                        <p>Wind {weather.wind.speed} m/s</p>
                    </div>


                )}
        </>
    )
}

export default Weather


