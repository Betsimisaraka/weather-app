import React, { createContext, useReducer } from 'react';

const GlobalContext = createContext();

function WeatherAppContext({children}) {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case "Fetch_weather": {
                return {
                    ...state,
                    isLoading: false,
                    weather: action.data
                }
            }
            case "Fetch_location": {
                return {
                    ...state,
                    isLoading: false,
                    weather: action.country
                }
            }
            default:
                break;
        }
        return state;
    }, {
        isLoading: true,
        weather: {},
        woeid: 44418,
        location: 'London',
    })
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { WeatherAppContext, GlobalContext }
