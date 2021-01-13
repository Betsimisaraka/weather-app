import React, { Children, createContext, useEffect, useState } from 'react';

const Context = createContext();

function ContextProvider({children}) {
    const [location, setLocation] = useState('london');
    const [woeid, setWoeid] = useState([]);
    const [weather, setWeather] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(false);
        const URL_API = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
        const response = await fetch(URL_API);
        const result = await response.json();
        setWeather(result);
        if (result.length) {
            setIsLoading(false);
            const URL_WOEID = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${result[0].woeid}/`;
            const res = await fetch(URL_WOEID);
            const data = await res.json();
            setWoeid(data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        fetchData();
    }

    return (
        <Context.Provider value={{ isLoading, location, woeid, weather, setWoeid, setLocation, handleSubmit }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
