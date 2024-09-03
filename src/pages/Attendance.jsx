import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';

const Attendance = () => {
  const { user } = UserAuth();
  const [filteredData, setFilteredData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // readGoogleSheet();
  }, []);

  // const readGoogleSheet = () => {
  //   fetch('https://sheetdb.io/api/v1/dj92fqopjka9m')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Attendance Data:", data);
  //       if (Array.isArray(data)) {
  //         const filteredData = data.filter((data) => user.email === data.Email);
  //         setFilteredData(filteredData);
  //         setDataLoaded(true);
  //       } else {
  //         console.error('Data is not in the expected format:', data);
  //       }
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // };

  return (
    <div className="ml-64 mt-16 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attendance Records</h2>

      {!dataLoaded ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium">Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Shift</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-sm text-gray-700">{data.Timestamp}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{data.Shift}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 px-4 text-center text-sm text-gray-500">
                    No attendance data available for the current user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;
