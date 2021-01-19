import React, { createContext, useEffect, useState, useReducer } from 'react';

const Context = createContext();

function ContextProvider({children}) {
    const [location, setLocation] = useState('london');
    const [name, setName] = useState('london');
    const [openModal, setOpenModal] = useState(false);
    const [isConverted, setIsConverted ] = useState(false);

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
            case "SEARCH_CITY": {
                return {
                    ...state,
                    woeid: action.filteredGithubJobs
                }
            }
            case "FETCH_CITY": {
                return {
                    ...state,
                    city: action.city
                }
            }
            default:
                return state;
        }
    }, {
        isLoading: true,
        weather: [],
        woeid: [],
        city: [],
    })

    async function fetchCity() {
        const URL_API = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${name}`
        const response = await fetch(URL_API);
        const data = await response.json();
        console.log(data);
        dispatch({ type: "FETCH_CITY", city: data });
    }

    useEffect(() => {
       fetchCity()
    }, [])

    async function fetchData(location) {
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
        fetchData(location);
    }, [location])

    function handleSubmit(param) {
        console.log(param);
        fetchData();
        setOpenModal(false)
        setLocation(param);
    }

    function backToTheLocation() {
        fetchData()
        setLocation('london');
    }

    function changeIntoCelcuis() {
        setIsConverted(false);
    }

    function changeIntoF() {
        setIsConverted(true);
    }

    return (
        <Context.Provider value={{ name, setName, fetchCity, location, state, setLocation, handleSubmit, openModal, setOpenModal, backToTheLocation, isConverted, changeIntoF, changeIntoCelcuis }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
