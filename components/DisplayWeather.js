import React, { useContext, useState } from 'react';
import { Context } from '../Context';

function DisplayWeather({ changeIntoCelcuis, changeIntoF, isConverted }) {
    const { state } = useContext(Context);
    const { woeid, isLoading } = state;
    const weatherToday = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[0];

    const weatherTommorow = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[1];
    const weather1 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[2];
    const weather2 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[3];
    const weather3 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[4];
    const weather4 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[5];
    const weatherDuringFiveDays = [weatherTommorow, weather1, weather2, weather3, weather4]
    
    return (
        <div>
            {isLoading && 'Loading...'}
            {!isLoading && 
                <div className="weather">
                    <div className="buttons_C_F">
                        <button onClick={changeIntoCelcuis} type="button"> ˚C</button>
                        <button onClick={changeIntoF} type="button"> ˚F</button>
                    </div>
                    <div className="weather_sixdays">    
                        <ul className="weather_fivedays">    
                            {weatherDuringFiveDays.map(days => {
                                const date = new Date(days && days.applicable_date);
                                const newDate = date.toLocaleString('en-US', { day: 'numeric', weekday: 'short', month: 'short' });
                                return (
                                    <li key={days && days.id}>
                                        <p>{newDate}</p> 
                                        <img src={`https://www.metaweather.com//static/img/weather/ico/${days && days.weather_state_abbr}.ico`} alt={days && days.weather_state_name} />
                                        <div className="weather_temp">     
                                            {isConverted 
                                                ?  <p>{(Math.floor(days && days.max_temp) * 9/5 + 32)} ˚F</p> 
                                                : <p>{(Math.floor(days && days.max_temp))} ˚C</p> 
                                            } 
                                            {isConverted 
                                                ? <p>{(Math.floor(days && days.min_temp) * 9/5 + 32)} ˚F</p> 
                                                : <p>{(Math.floor(days && days.min_temp))} ˚C</p> 
                                            }                         
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <div>     
                            <h2 className="weather_today__heading">Today’s Hightlights</h2>
                            <ul className="weather_today">
                                <li>
                                    <p>Wind status</p>
                                    <h3>{Math.floor(weatherToday && weatherToday.wind_speed)} <span>mph</span></h3>
                                    <div className="wind">
                                        <button className="wind_direction" type="button">X</button>
                                        <p>WSW</p>
                                    </div>
                                </li>
                                <li>
                                    <p>Humidity</p>
                                    <h3>{Math.floor(weatherToday && weatherToday.humidity)} <span>%</span></h3>
                                    <div className="percentage">
                                        <span>0%</span>
                                        <span>50%</span>
                                        <span>100%</span>                                    
                                    </div>
                                    <progress value={weatherToday && weatherToday.humidity} max="100"></progress>
                                </li>
                                <li>
                                    <p>Visibility</p>
                                    <h3>{Math.floor(weatherToday && weatherToday.visibility)} <span>miles</span></h3>
                                </li>
                                <li>
                                    <p>Air pressure</p>
                                    <h3>{Math.floor(weatherToday && weatherToday.air_pressure)} <span>mb</span></h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayWeather
