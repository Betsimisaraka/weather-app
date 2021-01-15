import React, { useContext, useState } from 'react';
import { Context } from '../Context';

function SearchForm({ setOpenModal, location, setLocation, handleSubmit }) {
    const { state } = useContext(Context);
    const { weather } = state;
    console.log(weather);

    const [isShow, setIsShow] = useState(false);

    function toggled() {
        setIsShow(!isShow);
    }

    function handleToggle(e) {
        e.preventDefault();
        toggled();
        setLocation(location);
    }

    function closeModal() {
        setOpenModal(false);
    }

    return (
        <div className="modal_outer"> 
            <div className="modal_inner">
                <button className="btn_close_modal" type="button" onClick={closeModal}>X</button>  
                <form onSubmit={handleToggle}>
                    <input 
                        type="text" 
                        value={location}
                        name="searchCity"
                        onChange={e => setLocation(e.target.value)}
                        placeholder="Search location" />
                    <button>Search</button>
                </form>
                {isShow && (weather.length > 0 && weather.map(weath =>
                    <button key={weath.title} className="btn_fetch" type="button" onClick={handleSubmit}>{weath.title}</button>))
                }
            </div>    
        </div>
    )
}

export default SearchForm