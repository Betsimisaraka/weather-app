import React, { createContext, useEffect, useState, useReducer } from 'react';

const Context = createContext();

function ContextProvider({children}) {
    const [location, setLocation] = useState('london');
    const [openModal, setOpenModal] = useState(false);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "FETCH_WEATHER": {
                return {
                    ...state,
                    isLoading: false,
                    weather: action.weather
                }
            }
            case "FETCH_WOEID": {
                return {
                    ...state,
                    isLoading: false,
                    woeid: action.woeid
                }
            }
            
            default:
                break;
        }
        return state;
    }, {
        isLoading: true,
        weather: [],
        woeid: {},
    })

    async function fetchData() {
        const URL_API = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
        const response = await fetch(URL_API);
        const result = await response.json();
        dispatch({ type: "FETCH_WEATHER", weather: result });
        if (result.length) {
            const URL_WOEID = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${result[0].woeid}/`;
            const res = await fetch(URL_WOEID);
            const data = await res.json();
            dispatch({ type: "FETCH_WOEID", woeid: data})
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        fetchData();
        setOpenModal(false)
        setLocation('london');
    }

    function backToTheLocation() {
        fetchData()
        setLocation('london');
    }

    return (
        <Context.Provider value={{ location, state, setLocation, handleSubmit, openModal, setOpenModal, backToTheLocation }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
