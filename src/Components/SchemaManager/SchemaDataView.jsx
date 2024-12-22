import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import backend_endpoint from '../Constants';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import FilterBar from './FilterBar';


function SchemaDataView() {
    const { schema } = useParams();
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([]);
    const [filters, setFilters] = useState([]);
    const [visible, setVisible] = useState(false);
    const [filterParams, setFilterParams] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleFilterApply = (newFilterPayload) => {
        setFilterParams(newFilterPayload); // Update filterParams when filters are applied
    };

    useEffect(() => {
        async function fetchSchemaData() {
            try {
                const loginToken = Cookies.get('login_token');
                const response = await axios.post(backend_endpoint + '/schema/' + schema + '/view',
                    {
                        filter_params: filterParams, // Add your filters
                        query_params: { page_number: pageNumber } // Add your query params
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${loginToken}` // Set the authorization header
                        }
                    });

                if (response.status == 200) {

                    setData(response.data.data);
                    setKeys(response.data.keys.filter(key => key != '_id'));
                    setTotalPages(Math.ceil(response.data.total_count / 20));
                    setFilters(response.data.filters);
                    setMessage('');
                }
                else {
                    setMessage(response.data.message);
                }

            } catch (error) {
                setMessage('An error displaying the data. Please try again !');
                console.error(error);
            }

        }
        fetchSchemaData();
    }, [filterParams, pageNumber])

    function toggleSidebarVisibility() {
        setVisible(!visible);
    }

    function handlePageClick() {
        setPageNumber(pageNumber)
    }

    return (
        <div style={{ backgroundColor: 'skyblue' }}>

            <FilterBar filters={filters} isVisible={visible} onClose={() => setVisible(false)} onApply={handleFilterApply} />
                
            <div className="container pt-4 responsive-container" style={{ width: '80%' }}>
                <div className='py-2 text-center'>
                    <h1 className='fw-bold pb-2 text-danger'>{schema}</h1>
                </div>
                <div className='pb-2'>
                    <div className='fst-italic fw-bold'>{message}</div>
                    <FontAwesomeIcon icon={faFilter} style={{ fontSize: '1.5rem', cursor: 'pointer' }} className='float-end text-danger' onClick={toggleSidebarVisibility} />
                </div>
                <div className='mt-4 pb-4'>
                    <div className='table-responsive text-light' style={{ maxHeight: '100vh' }}>

                        <table className='text-center' style={{ width: '100%', minWidth: '400px', margin: '0 auto', tableLayout: 'fixed' }}>
                            <thead className='position-sticky top-0'>
                                <tr >
                                    {
                                        keys.map((item, index) => (
                                            <th className='fw-bold bg-warning text-dark' key={index} style={{ backgroundColor: 'yellow' }}>
                                                {item}
                                            </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            {keys.map((key, idx) => (
                                                <td className='bg-dark' key={idx} style={{ backgroundColor: 'bisque' }}>{item[key]}</td>  // Ensure this line returns the <td> element
                                            ))}
                                        </tr>
                                    ))
                                }</tbody>
                        </table>
                    </div>
                </div>

                <div className='pb-4'>
                    <div className='pb-5'>
                        <nav className='float-end'>
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => setPageNumber(pageNumber => Math.max(pageNumber - 1, 1))}>
                                        Previous
                                    </button>
                                </li>

                                {
                                    Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1).map((page) => (
                                        <li key={page} className={`page-item ${pageNumber === page ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => setPageNumber(page)}>
                                                {page}
                                            </button>
                                        </li>
                                    ))
                                }

                                <li className="page-item">
                                    <button className="page-link" onClick={() => setPageNumber(prev => Math.min(pageNumber + 1, totalPages))}>
                                        Next
                                    </button>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>




            </div>

        </div>
    )
}

export default SchemaDataView;