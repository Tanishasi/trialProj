import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
const Leave = () => {
  const { user } = UserAuth();
  const [acknowledgment, setAcknowledgment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setAcknowledgment('Request sent to admin successfully.');
  };
  const [data, setData] = useState([]);

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
    <>
    {result.length > 0 ? (
    <div className="no-overflow-hidden flex justify-center items-center h-[50%] mt-[6.9%] ">
      <div className="w-full max-w-lg ">
        <div id="Leave" className=" shadow-md border border-gray-200 rounded px-8 py-8 w-[170%]">
          <h1 className="text-center mb-4">Request Leave</h1>
          {acknowledgment && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
              {acknowledgment}
            </div>
          )}
          <div className="text-center mb-4">
            <p className="text-sm">{result[0].SID}</p>
          </div>
          <form id="profileForm" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block">Name:</label>
              <input
                type="text"
                id="name"
               
                value={result[0].nameVal}
                className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
            </div>
            {/* Other form fields */}            <div>
              <label htmlFor="position" className="block">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                value="Security Guard"
                className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <label htmlFor="leaveType" className="block">Leave Type:</label>
              <select id="leaveType" name="leaveType" required className="block w-full px-4 py-2 border border-gray-300 rounded mb-4">
                <option value="vacation">Other</option>
                <option value="sick">Sick Leave</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block">Start Date:</label>
              <input type="date" id="startDate" name="startDate" required className="block w-full px-4 py-2 border border-gray-300 rounded mb-4" />
            </div>
            <div>
              <label htmlFor="endDate" className="block">End Date:</label>
              <input type="date" id="endDate" name="endDate" required className="block w-full px-4 py-2 border border-gray-300 rounded mb-4" />
            </div>
            <div>
              <label htmlFor="reason" className="block">Reason for Leave:</label>
              <textarea id="reason" name="reason" rows="4" required className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
    ):(<p>fetching</p>)}</>
  );
}

export default Leave;
