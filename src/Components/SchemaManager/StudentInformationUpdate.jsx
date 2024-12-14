import React, { useState } from "react";

const records = [
    {
        "sno": "1",
        "Scholar_No": "123456",
        "DOB": "2000-01-01",
        "Student_Name": "John Doe",
        "Branch": "Computer Science",
        "YOG": "2022"
    },
    {
        "sno": "2",
        "Scholar_No": "123457",
        "DOB": "1999-02-15",
        "Student_Name": "Jane Smith",
        "Branch": "Electrical Engineering",
        "YOG": "2023"
    },
    {
        "sno": "3",
        "Scholar_No": "123458",
        "DOB": "2001-05-20",
        "Student_Name": "Alice Johnson",
        "Branch": "Mechanical Engineering",
        "YOG": "2024"
    },
    {
        "sno": "4",
        "Scholar_No": "123459",
        "DOB": "1998-11-10",
        "Student_Name": "Bob Brown",
        "Branch": "Civil Engineering",
        "YOG": "2021"
    },
    {
        "sno": "5",
        "Scholar_No": "123460",
        "DOB": "2000-07-30",
        "Student_Name": "Eve Davis",
        "Branch": "Information Technology",
        "YOG": "2022"
    }
]


function StudentInformationUpdate() {
    const [studentRecords, setStudentRecords] = useState(records); 
    const handleInputToggle = (sno) => {
        const elements = document.getElementsByClassName(sno);
        console.log(elements);
        Array.from(elements).forEach((element) => {
            
            element.readOnly = !element.readOnly;
            console.log(element.readOnly);
        });
    };

    const handleChange = (e, index, field) => {
        const { value } = e.target;
      
        // Create a copy of the studentRecords array
        const updatedRecords = [...studentRecords];
      
        // Update the specific field in the record
        updatedRecords[index][field] = value;
        updatedRecords[index].selected = true;
        // Set the updated records state
        setStudentRecords(updatedRecords);
      };

    return (
        <div style={{ backgroundColor: "pink", minHeight: "100vh" }}>
            <div className="container text-center my-2">
                <h1 className="text-center py-4">Student Information</h1>

                <form action="/update" method="POST">
                    <div className="table-responsive" style={{ overflowY: "scroll", maxHeight: "75vh" }}>
                        <table className="table">
                            <thead style={{ position: "sticky", top: 0, backgroundColor: "aquamarine" }}>
                                <tr>
                                    <th style={tableHeaderStyle}>Select</th>
                                    <th style={tableHeaderStyle}>Scholar No.</th>
                                    <th style={tableHeaderStyle}>DOB</th>
                                    <th style={tableHeaderStyle}>Student Name</th>
                                    <th style={tableHeaderStyle}>Branch</th>
                                    <th style={tableHeaderStyle}>Year of Graduation</th>
                                </tr>
                            </thead>
                            <tbody style={{ backgroundColor: "bisque" }}>
                                {records.map((account,index) => (
                                    <tr key={account.sno}>
                                        <td style={tableDataStyle}>
                                            <input type="checkbox" name="id" value={account.sno} onClick={() => handleInputToggle(account.sno)}
                                            />
                                        </td>
                                        <td style={{ display: "none" }}>
                                            <input type="text" value={account.sno} className={account.sno} name="sno" readOnly
                                            />
                                        </td>
                                        <td style={tableDataStyle}>
                                            <input type="text" onChange={(e) => handleChange(e, index, "Scholar_No")} value={account.Scholar_No} className={account.sno} name="scholarno" readOnly
                                            />
                                        </td>
                                        <td style={tableDataStyle}>
                                            <input type="text" onChange={(e) => handleChange(e, index, "DOB")} value={account.DOB} className={account.sno} name="dob" readOnly
                                            />
                                        </td>
                                        <td style={tableDataStyle}>
                                            <input type="text" onChange={(e) => handleChange(e, index, "Student_Name")}  value={account.Student_Name} className={account.sno} name="studentname" readOnly
                                            />
                                        </td>
                                        <td style={tableDataStyle}>
                                            <input type="text" onChange={(e) => handleChange(e, index, "Branch")}  value={account.Branch} className={account.sno} name="branch" readOnly
                                            />
                                        </td>
                                        <td style={tableDataStyle}>
                                            <input value={account.YOG} onChange={(e) => handleChange(e, index, "YOG")}  className={account.sno} name="yog" readOnly type="text"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row">
                        <div className="col my-4 text-center">
                            <a className="btn btn-primary text-center" href="/records">
                                Return
                            </a>
                        </div>
                        <div className="col my-4 text-center">
                            <button className="btn btn-success text-center text-light" type="submit">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const tableHeaderStyle = {
    backgroundColor: 'cyan',
    borderRadius: "5%",
    border: "inset",
    padding: "5px",
    verticalAlign: "middle",
};

const tableDataStyle={
    borderRadius: '5%',
    border: 'inset',
    padding: '5px',
    verticalAlign: 'middle',
    backgroundColor:'bisque'

}

export default StudentInformationUpdate;
