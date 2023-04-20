import React, { useState, useEffect } from "react";
import axios from "axios";
import Employees from "./components/Employees";
import Pagination from "./components/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  const getEmployeesData = () => {
    axios
      .get("https://tempapi.proj.me/api/sBMVd9nZO")
      .then((res) => {
        // setData(res.data);
        setData(res.data.sort((emp1, emp2) => new Date(emp1.record.createdOn) - new Date(emp2.record.createdOn)));
        setLoading(false);
      })
      .catch(() => {
        alert("There was an error while retrieving the data");
      });
  };

  useEffect(() => {
    getEmployeesData();
  }, []);

  const searchTermHandler = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);

    if (searchTerm !== "") {
      const newEmployeesList = data.filter((emp) => {
        return (
          emp.record.createdOn
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          emp.credentials.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          emp.tenantSpecs.employerGID
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      });
      setSearchResults(newEmployeesList);
    } else {
      setSearchResults(data);
    }
  };

  console.log(searchResults);

  // setSortEmpsCreatedOn(data.sort((emp1, emp2) => Number(emp1.record.createdOn) - Number(emp2.record.createdOn)));
  // console.log(data, data.sort((emp1, emp2) => Number(emp1.record.createdOn) - Number(emp2.record.createdOn)));

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = data.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const nPages = Math.ceil(data.length / employeesPerPage);

  return (
    <div className="container mt-5">
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg" htmlFor="search">Search: </span>
        </div>
        <input id="search" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={searchTermHandler} />
      </div>

      <h2 className="my-2"> Employees </h2>
      <Employees
        data={searchTerm.length < 1 ? currentEmployees : searchResults}
      />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
