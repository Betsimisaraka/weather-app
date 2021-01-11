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
    console.log(getMonth);

    return (
        <div>
            <h1>Weather in the world</h1>
            {isLoading && 'Loading...'}
            {!isLoading && 
                <div>
                    <p>{weatherToday.weather_state_name}</p>
                    <p>Today: {getMonth}</p>
                    <h2>{weather.title}</h2>
                    {weatherDuring5days.map(days => (
                        <div>
                            <p>{days.applicable_date}</p> 
                            <p>{days.weather_state_name}</p>
                            <div>     
                                <p>{days.max_temp}</p>  
                                <p>{days.min_temp}</p>                         
                            </div>
                        </div>
                    ))}
                </div> 
            }
        </div>
    )
}

export default Weather
