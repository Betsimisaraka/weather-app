import React, { useContext } from 'react'
import { Context } from '../Context';
import DisplayWeather from '../components/DisplayWeather';

function App() {
    const { isLoading, location, woeid, weather, setLocation, handleSubmit } = useContext(Context);
    console.log(woeid);
    console.log(weather);

    console.log(woeid.consolidated_weather);
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="London" />
              <button>Search</button>
           </form> 
            <DisplayWeather isLoading={isLoading} woeid={woeid} weather={weather} />
        </div>
    )
}

export default App
