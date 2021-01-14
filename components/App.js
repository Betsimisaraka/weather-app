import React, { useContext, useState } from 'react'
import { Context } from '../Context';
import DisplayWeather from '../components/DisplayWeather';
import SearchForm from "../components/SearchForm";

function App() {
    const { location, setLocation, handleSubmit, openModal, setOpenModal, backToTheLocation } = useContext(Context);
    
    return (
        <div>
            {openModal && <SearchForm 
                setOpenModal={setOpenModal}
                location={location}
                setLocation={setLocation}
                handleSubmit={handleSubmit}
            />}
            <DisplayWeather
                setOpenModal={setOpenModal}
                openModal={openModal}
                backToTheLocation={backToTheLocation}
            />
        </div>
    )
}

export default App
