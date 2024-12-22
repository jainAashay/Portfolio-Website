import React, { useEffect, useRef, useState } from 'react';
import './Filter.css'; // Ensure to include the updated CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { filterParam } from './SchemaDataView';

function FilterBar({ filters,isVisible, onClose, onApply}) {


    const [filterPayload,setFilterPayload] = useState({});

    const closeButtonRef = useRef(null);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFilterPayload({
            ...filterPayload,
            [id]: value,
        });
    };

    const handleReset = () => {
        const resetPayload = Object.keys(filterPayload).reduce((acc, filter) => {
            acc[filter] = '';  // Reset all filters to empty string
            return acc;
        }, {});
        setFilterPayload(resetPayload);
    };

    const handleApply = () => {
        
        const cleanedFilterPayload = Object.fromEntries(
            Object.entries(filterPayload).filter(([_, value]) => value != null && value !== '')
        );
        if (onApply) {
            onApply(cleanedFilterPayload); // Send the cleaned payload back to SchemaDataView
        }
        
        if (onClose) {
            onClose();  // Directly invoke the onClose handler
        }
        
    };

    return (
        <div className={`filter-bar text-light ${isVisible ? 'open' : 'closed'}`} id="filterBar">
            <FontAwesomeIcon icon={faClose} onClick={onClose} ref={closeButtonRef}   className="fs-5 float-end p-3 text-light" style={{ cursor: 'pointer' }} />
            <div className="filter-content p-4">
                <div className='text-danger fs-4 text-center fw-bold p-3'>
                    Apply Filters 
                </div>
                {filters.map((filter, index) => (
                    <div className="mb-3" key={filter}>
                        <label htmlFor={filter} className="form-label fw-bold" style={{color:'gold'}}>{filter}</label>
                        <input type="text" className="form-control" id={filter} placeholder={filter} value={filterPayload[filter] || ''} onChange={handleInputChange} />
                    </div>
                ))}
            </div>
            <div className='row text-center g-0'>
                <div className='col-6 float-start'>
                    <button className='text-light btn btn-danger fw-bold px-4' onClick={handleReset}>Reset</button>
                </div>
                <div className='col-6 float-end'>
                    <button className='text-light btn btn-success fw-bold px-4' onClick={handleApply}>Apply</button>
                </div>
            </div>
        </div>
    );
}

export default FilterBar;
