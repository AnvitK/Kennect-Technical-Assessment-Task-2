import React, { useState } from "react";

const Employees = ({ data }) => {
  const [modeldata, setModeldata] = useState({});

  const showDetail = (emp) => {
    setModeldata(emp);
  };

  return (
    <>
      <table className="table mt-2">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Employer GID</th>
            <th scope="col">Created On</th>
            <th scope="col">Name</th>
            <th scope="col">DOJ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr
              key={emp._id}
              onClick={(e) => showDetail(emp)}
              data-toggle="modal"
              data-target="#myModal"
            >
              <td>{emp.credentials.username}</td>
              <td>{emp.communicationData.email}</td>
              <td>{emp.communicationData.phone}</td>
              <td>{emp.tenantSpecs.employerGID}</td>
              <td>{emp.record.createdOn}</td>
              <td>{emp.userData.name}</td>
              <td>{emp.userData.doj}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal" id="myModal">
        <div className="modal-dialog" style={{ width: "700px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Employee : {modeldata?.userData?.name}</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <ul>
                <li>Username: {modeldata?.credentials?.username}</li>
                <li>Email: {modeldata?.communicationData?.email}</li>
                <li>Phone: {modeldata?.communicationData?.phone}</li>
                <li>Employer GID: {modeldata?.tenantSpecs?.employerGID}</li>
                <li>Created On: {modeldata?.record?.createdOn}</li>
                <li>Name: {modeldata?.userData?.name}</li>
                <li>DOJ: {modeldata?.userData?.doj}</li>
              </ul>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;
