import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext'; // Import the UserAuth context

const Salary = () => {
  const workingDays = 22; // Example number of working days
  const hourlyRate = 700; // Example hourly rate
  
  const [hoursWorked, setHoursWorked] = useState(workingDays);
  const [taxes, setTaxes] = useState(0);
  const [salary, setSalary] = useState(0);

  const calculateSalary = () => {
    const grossSalary = hoursWorked * hourlyRate;
    const netSalary = grossSalary - taxes;
    setSalary(netSalary);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-2 sm:px-0">
        {/* Main content */}
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto"> {/* Responsive max-width */}
          {/* Navbar */}
          <div className="text-black py-4 px-4">
            <h1 className="text-2xl font-semibold">Salary</h1>
          </div>

          {/* Content */}
          <div className="mt-12">
            <div className="bg-white shadow-md rounded-md p-4 sm:p-6"> {/* Responsive padding */}
              <h2 className="text-xl font-bold mb-4">Salary Details</h2>
              
              <div className="mb-4">
                <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-700">Number of Working Days</label>
                <input
                  type="number"
                  id="hoursWorked"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="taxes" className="block text-sm font-medium text-gray-700">Taxes</label>
                <input
                  type="number"
                  id="taxes"
                  value={taxes}
                  onChange={(e) => setTaxes(e.target.value)}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center">
                <button
                  onClick={calculateSalary}
                  className="bg-blue-900 text-white px-3 py-2 rounded hover:bg-blue-700 w-full sm:w-auto mb-4 sm:mb-0"
                >
                  Calculate Salary
                </button>
                <div className="text-center sm:text-left">
                  <span className="font-semibold">Total Salary:</span> Rs {salary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Salary;


// const [hoursWorked, setHoursWorked] = useState(0);
  // const [hourlyRate, setHourlyRate] = useState(0);
  // const [salary, setSalary] = useState(0);
  // const [attendanceData, setAttendanceData] = useState([]);
  // const { user } = UserAuth(); // Get the current user from the UserAuth context
  // const [filteredData, setFilteredData] = useState([]); // State for filtered data
  // const [filteredDataCount, setFilteredDataCount] = useState(0);

  // useEffect(() => {
    // readGoogleSheet(); // Fetch data when the component mounts
  // }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // const readGoogleSheet = () => {
  //   fetch('https://sheetdb.io/api/v1/dj92fqopjka9m')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("xxxxx",data); 
  //       if (Array.isArray(data)) {
  //         const filteredData = data.filter((data) => user.email === data.Email);
  //         setFilteredData(filteredData);
  //         setFilteredDataCount(filteredData.length);
  //         console.log("first",filteredData);
  //       } else {
  //         console.error('Data is not in the expected format:', data);
  //       }
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // };

  // console.log('length',filteredDataCount);

  // const calculateSalary = () => {
  //   const salary = filteredDataCount * 700;
  //   setSalary(salary);
  // };
