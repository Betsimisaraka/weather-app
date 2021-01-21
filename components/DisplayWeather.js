import React, { useContext } from 'react';
import { Context } from '../Context';
import HightLights from '../components/HightLights';

function DisplayWeather() {
    const { state, changeIntoCelcuis, changeIntoF, isConverted } = useContext(Context);
    const { woeid, isLoading } = state; 

    const weatherTommorow = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[1];
    const weather1 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[2];
    const weather2 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[3];
    const weather3 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[4];
    const weather4 = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[5];
    const weatherDuringFiveDays = [weatherTommorow, weather1, weather2, weather3, weather4]
    
    return (
        <div>
            {isLoading 
                ? <p className="loading">Loading...</p> 
                : <div className="weather">
                    <div className="buttons_C_F">
                        <button onClick={changeIntoCelcuis} type="button"> ˚C</button>
                        <button onClick={changeIntoF} type="button"> ˚F</button>
                    </div>
                    <div className="weather_sixdays">    
                        <ul className="weather_fivedays">    
                            {weatherDuringFiveDays.map((days, index) => {
                                const date = new Date(days && days.applicable_date);
                                const newDate = date.toLocaleString('en-US', { day: 'numeric', weekday: 'short', month: 'short' });
                                return (
                                    <li key={index}>
                                        <p>{newDate}</p> 
                                        <img className="weather_image" src={`https://www.metaweather.com//static/img/weather/ico/${days && days.weather_state_abbr}.ico`} alt={days && days.weather_state_name} />
                                        <div className="weather_temp">     
                                            {isConverted 
                                                ?  <p className="max_temp">{(Math.floor(days && days.max_temp) * 9/5 + 32)} ˚F</p> 
                                                : <p className="max_temp">{(Math.floor(days && days.max_temp))} ˚C</p> 
                                            } 
                                            {isConverted 
                                                ? <p className="min_temp">{(Math.floor(days && days.min_temp) * 9/5 + 32)} ˚F</p> 
                                                : <p className="min_temp">{(Math.floor(days && days.min_temp))} ˚C</p> 
                                            }                         
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <div>     
                            <HightLights />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayWeather
