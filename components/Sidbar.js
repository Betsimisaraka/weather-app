import React, { useContext } from 'react'
import { Context } from '../Context';

function Sidbar({ setOpenModal, backToTheLocation, openModal, isConverted }) {
    const { state } = useContext(Context);
    const { woeid, isLoading } = state;
    
    console.log(woeid);

    const weatherToday = !isLoading && woeid && woeid.consolidated_weather && woeid.consolidated_weather[0];

    const date = new Date(weatherToday && weatherToday.applicable_date)
    const getMonth = date.toLocaleString('en-US', { day: 'numeric', weekday: 'short', month: 'short' });
    
    const img = weatherToday && weatherToday.weather_state_abbr;
    console.log(img);

    return (
        <div>
            <div className="weather_general"> 
                <div className="search_buttons">  
                    <button className="btn_openmodal" type="button" onClick={() => setOpenModal(!openModal)}>Search for places</button>
                    <button className="btn_back" onClick={backToTheLocation} type="button">O</button>
                </div>
                <img src={`https://www.metaweather.com//static/img/weather/png/${img}.png`} alt="Heavy rain" />
                {/* <p className="weather_today_temp">{Math.floor(weatherToday && weatherToday.the_temp)}<span>˚C</span></p>  */}
                {isConverted 
                    ? <p className="weather_today_temp">{(Math.floor(weatherToday && weatherToday.the_temp) * 9/5 + 32)} ˚F</p> 
                    : <p className="weather_today_temp">{(Math.floor(weatherToday && weatherToday.the_temp))} ˚C</p> 
                }   
                <p className="weather_name">{weatherToday && weatherToday.weather_state_name}</p>
                <p className="weather_date_today">Today: {getMonth}</p>
                <h1>{woeid.title}</h1>
            </div>
        </div>
    )
}

export default Sidbar
