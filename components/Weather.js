import React, { useContext, useEffect } from 'react'
import { GlobalContext } from './WeatherAppContext'

function Weather() {
    const { state, dispatch } = useContext(GlobalContext);
    const { isLoading, weather, location, woeid } = state;

    const CORS_API = "https://cors-anywhere.herokuapp.com/";
    const URL_API = `https://www.metaweather.com/api/location/search/?query=${location}`
    const LOCATION = `https://www.metaweather.com/api/location/${woeid}/`;

    // useEffect(() => {
    //         async function fetchWeather() {
    //             const res = await fetch(CORS_API + URL_API);
    //             console.log(res);
    //             const data = await res.json();
    //             console.log(data);
    //             dispatch({ type: "Fetch_weather", data: data[0]});
    //         }
    //         fetchWeather();
    // }, []);

    useEffect(() => {
        async function fetchLocation() {
            const res = await fetch(CORS_API + LOCATION);
            console.log(res);
            const data = await res.json();
            console.log(data);
            dispatch({ type: "Fetch_location", country: data});
        }
        fetchLocation();
    }, []);
    
    console.log(weather.consolidated_weather);

    const weatherToday = !isLoading && weather && weather.consolidated_weather[0];

    const weatherTomorrow = !isLoading && weather && weather.consolidated_weather[1];
    const weather2 = !isLoading && weather && weather.consolidated_weather[2];
    const weather3 = !isLoading && weather && weather.consolidated_weather[3];
    const weather4 = !isLoading && weather && weather.consolidated_weather[4];
    const weather5 = !isLoading && weather && weather.consolidated_weather[5];

    const weatherDuring5days = [weatherTomorrow, weather2, weather3, weather4,  weather5]
    console.log(weatherDuring5days);

    const date = new Date(!isLoading && weather && weather.time)
    const getMonth = date.toLocaleString('en-US', { day: 'numeric', weekday: 'short', month: 'short' });

    return (
        <div className="weather_container">
            {isLoading && 'Loading...'}
            {!isLoading && 
                <div>
                    <div>     
                        <p>{weatherToday.weather_state_name}</p>
                        <p>Today: {getMonth}</p>
                        <h2>{weather.title}</h2>
                    </div>
                    <ul className="weather_fivedays">    
                        {weatherDuring5days.map(days => (
                            <li key={days.id}>
                                <p>{days.applicable_date}</p> 
                                <p>{days.weather_state_name}</p>
                                <div>     
                                    <p>{days.max_temp}</p>  
                                    <p>{days.min_temp}</p>                         
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Today’s Hightlights</h3>
                    <ul className="weather_today">
                        <li>
                            <p>Wind status</p>
                            <h3>{weatherToday.wind_speed}</h3>
                        </li>
                        <li>
                            <p>Humidity</p>
                            <h3>{weatherToday.humidity}</h3>
                        </li>
                        <li>
                            <p>Visibility</p>
                            <h3>{weatherToday.visibility}</h3>
                        </li>
                        <li>
                            <p>Air pressure</p>
                            <h3>{weatherToday.air_pressure}</h3>
                        </li>
                    </ul>
                </div> 
            }
        </div>
    )
}

export default Weather
