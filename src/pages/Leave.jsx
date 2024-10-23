import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Leave = () => {
  const { user } = UserAuth();
  const [acknowledgment, setAcknowledgment] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAcknowledgment('Request sent to admin successfully.');
  };

  const getData = async () => {
    const valRef = collection(db, 'details');
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  const result = data.filter(data => user.email === data.emailVal);

  return (
    <div className="flex justify-center items-center mt-[5%] pl-6 pr-4 sm:px-0"> {/* Added left padding only */}
      {result.length > 0 ? (
        <div className="w-full max-w-sm sm:max-w-lg">
          <div className="shadow-md border border-gray-300 rounded-lg px-4 sm:px-8 py-6">
            <h1 className="text-center mb-6 text-2xl font-semibold text-gray-800">Request Leave</h1>
            {acknowledgment && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
                {acknowledgment}
              </div>
            )}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">{result[0].SID}</p>
            </div>
            <form id="profileForm" className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={result[0].nameVal}
                  className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-gray-700">Position:</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value="Security Guard"
                  className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="leaveType" className="block text-gray-700">Leave Type:</label>
                <select id="leaveType" name="leaveType" required className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500">
                  <option value="vacation">Other</option>
                  <option value="sick">Sick Leave</option>
                </select>
              </div>
              <div>
                <label htmlFor="startDate" className="block text-gray-700">Start Date:</label>
                <input type="date" id="startDate" name="startDate" required className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-gray-700">End Date:</label>
                <input type="date" id="endDate" name="endDate" required className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="reason" className="block text-gray-700">Reason for Leave:</label>
                <textarea id="reason" name="reason" rows="4" required className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-center mt-6 text-gray-600">Fetching data...</p>
      )}
    </div>
  );
};

export default Leave;
