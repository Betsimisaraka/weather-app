import React, { useContext, useState } from 'react'
import { Context } from '../Context';
import DisplayWeather from '../components/DisplayWeather';
import SearchForm from "../components/SearchForm";
import Sidbar from '../components/Sidbar';

function App() {
    const { openModal } = useContext(Context);
    
    return (
        <div>
            {openModal && <SearchForm />}
            <Sidbar />
            <DisplayWeather />
        </div>
    )
}

export default App
