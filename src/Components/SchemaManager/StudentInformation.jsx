import React, { useState } from "react";
import './StudentInformation.css';
import { Alert } from "react-bootstrap";

function StudentInformation() {
    const [formData, setFormData] = useState({
        scno: "",
        dob: "",
        studentName: "",
        branch: "",
        YOG: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // You can replace the above line with the API call to submit the form
    };

    return (
        <>
        <Alert dismissible className="fs-6" style={{marginBottom:"-10px"}}>
                 Hello
        </Alert>
        <div className="py-5" style={{ backgroundColor: "bisque" }}>
            
            <div className="container bg-dark text-light px-4 fs-1 shadow-lg rounded pb-5" id="x" style={{ height: "fit-content" }}>
                <h1 className="py-4 text-center fw-bold" style={{ color: "chartreuse" }}>
                    Student Information Record
                </h1>

                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="scholarNo" className="form-label fs-5 fw-bold" style={{ color: "aqua" }}>
                                Scholar No.
                            </label>
                            <input type="number" className="form-control rounded" name="scno" placeholder="20111XXXX" value={formData.scno} onChange={handleChange} required />
                        </div>

                        <div >
                            <label htmlFor="dob" className="form-label fs-5 fw-bold" style={{ color: "aqua" }}>
                                Date of Birth
                            </label>
                            <input type="date" className="form-control rounded" name="dob" value={formData.dob} onChange={handleChange} required />
                        </div>

                        <div >
                            <label htmlFor="studentName" className="form-label fs-5 fw-bold" style={{ color: "aqua" }}>
                                Student Name
                            </label>
                            <input type="text" className="form-control rounded" name="studentName" value={formData.studentName} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor="branch" className="form-label fs-5 fw-bold" style={{ color: "aqua" }}>
                                Branch
                            </label>
                            <select className="form-select form-select-md" name="branch" value={formData.branch} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Computer Science & Engineering">
                                    Computer Science Engineering
                                </option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Civil Engineering">Civil Engineering</option>
                                <option value="Electronics and Communication Engineering">
                                    Electronics and Communication Engineering
                                </option>
                            </select>
                        </div>

                        <div >
                            <label htmlFor="YOG" className="form-label fs-5 fw-bold" style={{ color: "aqua" }}>
                                Year of Graduation
                            </label>
                            <input type="number" className="form-control rounded" name="YOG" value={formData.YOG} onChange={handleChange} required
                            />
                        </div>

                        <div className="text-center pt-4">
                            <button type="submit" className="btn btn-success text-light fw-bold" style={{ width: "100%", backgroundColor: "forestgreen" }}>
                                Add Details
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center fs-6">
                    <b>OR</b>
                </div>

                <hr className="bg-light" />

                <div className="pb-4 px-3 text-center">
                    <a href="/records" className="btn btn-danger my-3 float-start">
                        View Records
                    </a>

                    <a href="/information/uploadData" className="btn btn-warning my-3 float-end">
                        Add from CSV
                    </a>
                </div>
            </div>
        </div>
        </>

    );
}

export default StudentInformation;
