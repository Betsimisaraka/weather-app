import React, { useContext, useState } from 'react'
import { Context } from '../Context';
import DisplayWeather from '../components/DisplayWeather';
import SearchForm from "../components/SearchForm";
import Sidbar from '../components/Sidbar';

function App() {
    const { location, setLocation, handleSubmit, openModal, setOpenModal, backToTheLocation,  isConverted, changeIntoF, changeIntoCelcuis } = useContext(Context);
    
    return (
        <div>
            {openModal && <SearchForm 
                setOpenModal={setOpenModal}
                location={location}
                setLocation={setLocation}
                handleSubmit={handleSubmit}
            />}
            <Sidbar 
                setOpenModal={setOpenModal}
                openModal={openModal}
                backToTheLocation={backToTheLocation}
                isConverted={isConverted}
            />
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
