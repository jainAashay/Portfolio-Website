import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import backend_endpoint from '../Constants';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilter, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import FilterBar from './FilterBar';
import { toast, ToastContainer } from 'react-toastify';
import SchemaDataUpdate from './SchemaDataUpdate';
import { Pagination } from '@mui/material';
import Model from '../Portfolio_Website/Model_Login';
import {useLoginModal} from '../Login';

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
    const [loading, setLoading] = useState(false); // State for loading spinner
    const [dataToUpdate, setDataToUpdate] = useState(null);

    const handleDelete = async (id) => {
        try {
            const loginToken = Cookies.get('login_token');
            const response = await axios.delete(backend_endpoint + '/schema/' + schema + '/data/delete/' + id, {
                headers: {
                    Authorization: `Bearer ${loginToken}` // Set the authorization header
                }
            });
            if (response.status == 200) {
                toast.success("Data Deleted Successfuly");
                fetchSchemaData();
            }
            else if (response.status == 401) {
                toast.error("Unauthored ! Please login and try again !");
            }
            else {
                toast.error("An error occured.Pls try again");
            }
        }
        catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const handleFilterApply = (newFilterPayload) => {
        setFilterParams(newFilterPayload); // Update filterParams when filters are applied
    };

    async function fetchSchemaData() {
        setLoading(true); // Show spinner
        setMessage('');   // Clear previous messages
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
                    },
                     validateStatus: (status) => status < 500
                });

            if (response.status === 200) {
                setData(response.data.data);
                setKeys(response.data.keys.filter(key => key !== '_id'));
                setTotalPages(Math.ceil(response.data.total_count / 20));
                setFilters(response.data.filters);
            } else {
                setMessage('Unauthored ! Please login and try again !');
            }
        } catch (error) {
            toast.error('An error occurred while fetching data. Please try again.');
            setMessage('An error occurred while fetching data. Please try again.')
            console.error(error);
        } finally {
            setLoading(false); // Hide spinner
        }
    }

    useLoginModal();

    useEffect(() => {

        fetchSchemaData();
    }, [filterParams, pageNumber]);

    function toggleSidebarVisibility() {
        setVisible(!visible);
    }

    const handleDownload = async () => {
        try {
            const loginToken = Cookies.get('login_token');
            const response = await axios.get(backend_endpoint + '/schema/' + schema + '/data/download', {
                headers: {
                    Authorization: `Bearer ${loginToken}` // Set the authorization header
                },
                responseType: 'blob'
            });



            if (response.status == 200) {
                const fileBlob = response.data;
                const downloadUrl = window.URL.createObjectURL(fileBlob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'data-file.xlsx'); // Set the desired file name here
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
                toast.success("Data Downloaded Successfuly");
            }
            else if (response.status == 401) {
                toast.error("Unauthored ! Please login and try again !");
            }
            else {
                toast.error("An error occured.Pls try again later");
            }
        }
        catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    }

    return (
        <div style={{ backgroundColor: 'skyblue', height: 'fitContent' }}>
            <ToastContainer />
            <Model />

            <SchemaDataUpdate data={dataToUpdate} />
            <FilterBar filters={filters} isVisible={visible} onClose={() => setVisible(false)} onApply={handleFilterApply} />

            <div className="container pt-4 responsive-container" style={{ width: '80%' }}>
                <div className='py-2 text-center'>
                    <h1 className='fw-bold pb-2 text-danger'>{schema}</h1>
                </div>

                {loading ? ( // Spinner while loading
                    <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : message ? ( // Error message
                    <div className='text-center py-3 text-dark fst-italic'>
                        <strong>{message}</strong>
                    </div>
                ) : (
                    <>
                        <div className=''>
                            <div className="d-flex justify-content-end align-items-center">
                                <button className='btn btn-sm btn-outline-dark fw-bold' style={{ marginRight: '1rem' }} onClick={handleDownload}>Download</button>
                                <FontAwesomeIcon
                                    icon={faFilter}
                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                    className='text-danger'
                                    onClick={toggleSidebarVisibility}
                                />
                            </div>
                        </div>

                        <div className='pt-2 pb-4'>
                            <div className='table-responsive' style={{ maxHeight: '100vh', scrollbarWidth: 'none' }}>
                                <table className='text-center' style={{ width: '100%', minWidth: '400px', margin: '0 auto', tableLayout: 'fixed' }}>
                                    <thead className='position-sticky top-0'>
                                        <tr>
                                            <th className='fw-bold bg-warning text-dark border' style={{ backgroundColor: 'yellow', width: '6rem' }}>
                                                Actions
                                            </th>
                                            {keys.map((item, index) => (
                                                <th className='fw-bold bg-warning text-dark border' key={index} style={{ backgroundColor: 'yellow' }}>
                                                    {item}
                                                </th>
                                            ))}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index} style={{ backgroundColor: 'bisque' }}>
                                                <td className='text-center'>
                                                    <FontAwesomeIcon className='action-item ps-1' icon={faPen} style={{ color: 'blue' }} data-bs-toggle="modal" data-bs-target="#UpdateDataModal" onClick={() => { setDataToUpdate(item) }} />

                                                    <FontAwesomeIcon className='action-item' icon={faTrashAlt} style={{ color: 'red' }} onClick={() => handleDelete(item._id)} />
                                                </td>

                                                {keys.map((key, idx) => (
                                                    <td key={idx}>{item[key]}</td>
                                                ))}

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='d-flex justify-center'>
                            <Pagination className='mx-auto pb-4' count={totalPages} page={pageNumber} siblingCount={1} boundaryCount={2} color="secondary" onChange={(event, page) => setPageNumber(page)} showFirstButton showLastButton />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SchemaDataView;
