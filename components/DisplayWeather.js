import React from 'react'

function DisplayWeather({ woeid, isLoading }) {

    console.log(woeid.consolidated_weather);

    const weatherToday = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[0];
    console.log(weatherToday);
    console.log(weatherToday && weatherToday.weather_state_name);

    const weatherTommorow = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[1];
    const weather1 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[2];
    const weather2 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[3];
    const weather3 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[4];
    const weather4 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[5];

    const weatherDuringFiveDays = [weatherTommorow, weather1, weather2, weather3, weather4]
    console.log(weatherDuringFiveDays);

    const date = new Date(weatherToday && weatherToday.applicable_date)
    const getMonth = date.toLocaleString('en-US', { day: 'numeric', weekday: 'short', month: 'short' });
    
    return (
        <div>
            {isLoading && 'Loading...'}
            {!isLoading && 
                <div className="weather">
                    <div> 
                        <img src={`https://www.metaweather.com/api/static/img/weather/png/64/${weatherToday && weatherToday.weather_state_abbr}.png`} alt="" />
                        <p>{weatherToday && weatherToday.the_temp}</p>    
                        <p>{weatherToday && weatherToday.weather_state_name}</p>
                        <p>Today: {getMonth}</p>
                        <h1>{woeid.title}</h1>
                    </div>
                    <div>    
                        <ul className="weather_fivedays">    
                            {weatherDuringFiveDays.map(days => (
                                <li key={days && days.id}>
                                    <p>{days && days.applicable_date}</p> 
                                    <p>{days && days.weather_state_name}</p>
                                    <div className="weather_temp">     
                                        <p>{Math.floor(days && days.max_temp)}</p>  
                                        <p>{Math.floor(days && days.min_temp)}</p>                         
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h3>Today’s Hightlights</h3>
                        <ul className="weather_today">
                            <li>
                                <p>Wind status</p>
                                <h3>{Math.floor(weatherToday && weatherToday.wind_speed)}</h3>
                            </li>
                            <li>
                                <p>Humidity</p>
                                <h3>{Math.floor(weatherToday && weatherToday.humidity)}</h3>
                            </li>
                            <li>
                                <p>Visibility</p>
                                <h3>{Math.floor(weatherToday && weatherToday.visibility)}</h3>
                            </li>
                            <li>
                                <p>Air pressure</p>
                                <h3>{Math.floor(weatherToday && weatherToday.air_pressure)}</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayWeather
