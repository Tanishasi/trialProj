import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext'; // Import the UserAuth context

const Salary = () => {
  const [hoursWorked, setHoursWorked] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [salary, setSalary] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const { user } = UserAuth(); // Get the current user from the UserAuth context
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [filteredDataCount, setFilteredDataCount] = useState(0);

  useEffect(() => {
    readGoogleSheet(); // Fetch data when the component mounts
  },[]); // Empty dependency array ensures this effect runs only once when the component mounts

  const readGoogleSheet = () => {
    fetch('https://sheetdb.io/api/v1/dj92fqopjka9m')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("xxxxx",data); 
        if (Array.isArray(data)) {
          const filteredData = data.filter((data) => user.email === data.Email);
          setFilteredData(filteredData);
          setFilteredDataCount(filteredData.length);
          console.log("first",filteredData);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  console.log('length',filteredDataCount);

  const calculateSalary = () => {
    const salary = filteredDataCount * 700;
    setSalary(salary);
  };

  return (
    <>
    {filteredDataCount > 0 ?
      <div className="flex justify-center items-center h-screen">
        {/* Sidebar (left navigation) */}
  
        {/* Main content */}
        <div className="ml-64 w-full">
          {/* Navbar */}
          <div className="text-black py-4 px-8 ml-[30%]">
            <h1 className="text-2xl font-semibold">Salary </h1>
          </div>
  
          {/* Content */}
          <div className="container mx-auto mt-12 px-4">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
              <div className="mb-4">
                <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-700">No. of working days</label>
                <input type="number" id="hoursWorked" value={filteredDataCount} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Taxes</label>
                <input type="number" id="hourlyRate" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <button onClick={calculateSalary} className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-900">Calculate Salary</button>
                <div>
                  <span className="font-semibold">Total Salary:</span> Rs {salary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <div className="flex justify-center items-center h-screen">
        {/* Sidebar (left navigation) */}
  
        {/* Main content */}
        <div className="ml-64 w-full">
          {/* Navbar */}
          <div className="text-black py-4 px-8 ml-[30%]">
            <h1 className="text-2xl font-semibold">Salary </h1>
          </div>
  
          {/* Content */}
          <div className="container mx-auto mt-12 px-4">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
              <div className="mb-4">
                <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-700">No. of working days</label>
                <input type="number" id="hoursWorked" value="" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Taxes</label>
                <input type="number" id="hourlyRate" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <button onClick={calculateSalary} className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-900">Calculate Salary</button>
                <div>
                  <span className="font-semibold">Total Salary:</span> Rs {salary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default Salary;
