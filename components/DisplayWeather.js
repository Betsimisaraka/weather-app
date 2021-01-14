import React, { useContext } from 'react';
import { Context } from '../Context';

function DisplayWeather({ openModal, setOpenModal, backToTheLocation }) {
    const { state } = useContext(Context);
    const { woeid, isLoading } = state;
    const weatherToday = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[0];

    const weatherTommorow = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[1];
    const weather1 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[2];
    const weather2 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[3];
    const weather3 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[4];
    const weather4 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[5];
    const weatherDuringFiveDays = [weatherTommorow, weather1, weather2, weather3, weather4]

    const date = new Date(weatherToday && weatherToday.applicable_date)
    const getMonth = date.toLocaleString('en-US', { day: 'numeric', weekday: 'short', month: 'short' });

    const img = weatherToday && weatherToday.weather_state_abbr;
    console.log(img);
    
    return (
        <div>
            {isLoading && 'Loading...'}
            {!isLoading && 
                <div className="weather">
                    <div className="weather_general"> 
                        <div className="search_buttons">  
                            <button className="btn_openmodal" type="button" onClick={() => setOpenModal(!openModal)}>Search for places</button>
                            <button className="btn_back" onClick={backToTheLocation} type="button">O</button>
                        </div>
                        <img src={`https://www.metaweather.com//static/img/weather/png/${img}.png`} alt="Heavy rain" />
                        <p>{Math.floor(weatherToday && weatherToday.the_temp)}</p>    
                        <p>{weatherToday && weatherToday.weather_state_name}</p>
                        <p>Today: {getMonth}</p>
                        <h1>{woeid.title}</h1>
                    </div>
                    <div className="weather_sixdays">    
                        <ul className="weather_fivedays">    
                            {weatherDuringFiveDays.map(days => (
                                <li key={days && days.id}>
                                    <p>{days && days.applicable_date}</p> 
                                    <img src={`https://www.metaweather.com//static/img/weather/ico/${days && days.weather_state_abbr}.ico`} alt={days && days.weather_state_name} />
                                    <div className="weather_temp">     
                                        <p>{Math.floor(days && days.max_temp)} C</p>  
                                        <p>{Math.floor(days && days.min_temp)} C</p>                         
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h3>Today’s Hightlights</h3>
                        <ul className="weather_today">
                            <li>
                                <p>Wind status</p>
                                <h3>{Math.floor(weatherToday && weatherToday.wind_speed)} mph</h3>
                            </li>
                            <li>
                                <p>Humidity</p>
                                <h3>{Math.floor(weatherToday && weatherToday.humidity)} %</h3>
                            </li>
                            <li>
                                <p>Visibility</p>
                                <h3>{Math.floor(weatherToday && weatherToday.visibility)} miles</h3>
                            </li>
                            <li>
                                <p>Air pressure</p>
                                <h3>{Math.floor(weatherToday && weatherToday.air_pressure)} mb</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayWeather
