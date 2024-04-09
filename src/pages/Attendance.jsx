import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext'; // Import the UserAuth context

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { user } = UserAuth(); // Get the current user from the UserAuth context
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [dataLoaded, setDataLoaded] = useState(false); // State to track if data is loaded

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
          setDataLoaded(true); // Set dataLoaded to true when data is loaded
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <>
      {dataLoaded ? ( // Conditionally render based on dataLoaded state
        <>
          <div className="container mx-auto mt-[7%] ml-[30%] ">
            <h2 className="text-3xl font-bold mb-4">Attendance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <table className="w-full border border-blue-900">
                  <thead>
                    <tr className="bg-blue-900">
                      <th className="border border-blue-900 p-2 text-white">Date</th>
                      <th className="border border-blue-900 p-2 text-white">Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((data) => (
                        <tr key={data.id} className="border border-blue-900">
                          <td className="border border-blue-900 p-2">{data.Timestamp}</td>
                          <td className="border border-blue-900 p-2">{data.Shift}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="border border-blue-900 p-2">No attendance data available for the current user.</td>
                        <td className="border border-blue-900 p-2">{}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Attendance;
