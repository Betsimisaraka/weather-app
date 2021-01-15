import React, { useContext } from 'react'
import { Context } from '../Context';

function HightLights() {
    const { state } = useContext(Context);
    const { woeid, isLoading } = state;

    const weatherToday = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[0];

    return (
        <div>
            <h2 className="weather_today__heading">Today’s Hightlights</h2>
            <ul className="weather_today">
                <li>
                    <p>Wind status</p>
                    <h3>{Math.floor(weatherToday && weatherToday.wind_speed)} <span>mph</span></h3>
                    <div className="wind">
                        <button className="wind_direction" type="button">↖</button>
                        <p>{weatherToday && weatherToday.wind_direction_compass}</p>
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
    )
}

export default HightLights
