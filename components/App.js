import React, { useContext, useState } from 'react'
import { Context } from '../Context';
import DisplayWeather from '../components/DisplayWeather';
import SearchForm from "../components/SearchForm";
import Sidbar from '../components/Sidbar';

function App() {
    const { name, setName, fetchCity, location, setLocation, handleSubmit, openModal, setOpenModal, backToTheLocation,  isConverted, changeIntoF, changeIntoCelcuis } = useContext(Context);
    
    return (
        <div>
            {openModal && <SearchForm
                fetchCity={fetchCity}
                setName={setName}
                name={name}
                setOpenModal={setOpenModal}
                location={location}
                setLocation={setLocation}
                handleSubmit={handleSubmit}
            />}
            <Sidbar />
            <DisplayWeather
                setOpenModal={setOpenModal}
                openModal={openModal}
                backToTheLocation={backToTheLocation}
                isConverted={isConverted}
                changeIntoCelcuis={changeIntoCelcuis}
                changeIntoF={changeIntoF}
            />
        </div>
    )
}

export default App
