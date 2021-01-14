import React, { useState } from 'react'

function SearchForm({ setOpenModal, location, setLocation, handleSubmit }) {
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
                <form>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={e => setLocation(e.target.value)}
                        placeholder="Search location" />
                    <button type="button" onClick={handleToggle}>Search</button>
                </form>
                {isShow && <button className="btn_fetch" type="button" onClick={handleSubmit} value={location}>{location}</button>}
            </div>    
        </div>
    )
}

export default SearchForm