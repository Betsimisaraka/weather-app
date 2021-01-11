import React, { createContext, useReducer } from 'react';

const GlobalContext = createContext();

function WeatherAppContext({children}) {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action) {
            case "Fetch_weather": {
                return {
                    ...state,
                    isLoading: false,
                    weather: action.weather
                }
            }
        
            default:
                break;
        }
        return state;
    }, {
        isLoading: true,
        weather: [],
        location: 'London',
    })
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { WeatherAppContext, GlobalContext }
