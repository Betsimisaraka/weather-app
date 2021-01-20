import React, { useContext, useState } from 'react';
import { Context } from '../Context';

function SearchForm() {
    const { state, fetchCity, setName, name, setOpenModal, location, setLocation, handleSubmit } = useContext(Context);
    const { city } = state;
    const [isShow, setIsShow] = useState(false);

    function toggled() {
        setIsShow(!isShow);
    }

    function handleToggle(e) {
        e.preventDefault();
        toggled();
        setLocation(location);
        fetchCity();
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
                        value={name}
                        name="searchCity"
                        className="location_input"
                        onChange={e => setName(e.target.value)}
                        placeholder="Search location" />
                    <button>Search</button>
                </form>
                {/* {isShow && (<button className="btn_fetch" type="button" value={location} onClick={handleSubmit}>{location}</button>)} */}
                {isShow && (city.length > 0 && city.map(weath =>
                    <button key={weath.title} className="btn_fetch" type="button" value={weath.title} onClick={() => handleSubmit(weath.title)}>{weath.title}</button>))
                }
            </div>    
        </div>
    )
}

export default SearchForm