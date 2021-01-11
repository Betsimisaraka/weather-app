import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {WeatherAppContext} from './components/WeatherAppContext';

ReactDOM.render(
    <WeatherAppContext>
        <App />
    </WeatherAppContext>,
    document.getElementById('root')
);