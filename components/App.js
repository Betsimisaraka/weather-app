import React, { useContext, useState } from 'react'
import { Context } from '../Context';
import DisplayWeather from '../components/DisplayWeather';
import SearchForm from "../components/SearchForm";

function App() {
    const { isLoading, location, woeid, weather, setLocation, handleSubmit, openModal, setOpenModal } = useContext(Context);
    
    return (
        <div>
            {openModal && <SearchForm 
                setOpenModal={setOpenModal}
                location={location}
                setLocation={setLocation}
                handleSubmit={handleSubmit}
            />}
            <DisplayWeather isLoading={isLoading} woeid={woeid} weather={weather} 
                setOpenModal={setOpenModal}
                openModal={openModal}
            />
        </div>
    )
}

export default App
