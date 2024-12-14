import React, { useState } from "react";

const StudentInformationDelete = () => {
  const [records, setRecords] = useState([
    // Mock data. Replace this with actual data fetching logic.
    { sno: 1, Scholar_No: "12345", DOB: "2001-01-01", Student_Name: "John Doe", Branch: "CSE", YOG: "2023" },
    { sno: 2, Scholar_No: "12346", DOB: "2002-02-02", Student_Name: "Jane Smith", Branch: "ECE", YOG: "2024" },
  ]);

  const handleDelete = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const idsToDelete = formData.getAll("id");

    // Perform deletion logic here
    console.log("Selected IDs for deletion:", idsToDelete);

    // Update the records to remove deleted items (mock example)
    setRecords((prev) => prev.filter((record) => !idsToDelete.includes(record.sno.toString())));
  };

  return (
    <div style={{ backgroundColor: "pink", minHeight:'100vh'}}>
      <div className="container text-center my-2">
        <h1 className="text-center pt-4 pb-5">Student Information</h1>

        <form onSubmit={handleDelete}>
          <div className="table-responsive" style={{ overflowY: "scroll", maxHeight: "75vh" }}>
            <table className="table">
              <thead style={{ position: "sticky", top: "0px", backgroundColor: "aquamarine" }}>
                <tr>
                  <th style={styles.head}>Select</th>
                  <th style={styles.head}>Scholar No.</th>
                  <th style={styles.head}>DOB</th>
                  <th style={styles.head}>Student Name</th>
                  <th style={styles.head}>Branch</th>
                  <th style={styles.head}>Year of Graduation</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "bisque" }}>
                {records.map((account) => (
                  <tr key={account.sno}>
                    <td style={styles.cell}>
                      <input type="checkbox" name="id" value={account.sno} />
                    </td>
                    <td style={styles.cell}>{account.Scholar_No}</td>
                    <td style={styles.cell}>{account.DOB}</td>
                    <td style={styles.cell}>{account.Student_Name}</td>
                    <td style={styles.cell}>{account.Branch}</td>
                    <td style={styles.cell}>{account.YOG}</td>
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
              <button className="btn btn-danger text-center text-light" type="submit">
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  head: {
    backgroundColor:'bisque',
    borderRadius: "5%",
    border: "inset",
    padding: "5px",
    verticalAlign: "middle",
  },
  cell:{
    backgroundColor:'bisque',
    borderRadius: "5%",
    border: "inset",
    padding: "5px",
    verticalAlign: "middle",
  }
};

export default StudentInformationDelete;
