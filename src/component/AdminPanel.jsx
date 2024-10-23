import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

const AdminPanel = () => {
  const [data, setData] = useState([]); // To hold employee data
  const [searchTerm, setSearchTerm] = useState(''); // To hold the search term
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To hold the selected employee's details

  // Fetch data from Firestore
  const getData = async () => {
    const valRef = collection(db, 'details');
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const employee = data.find(emp => emp.nameVal.toLowerCase() === searchTerm.toLowerCase());
    setSelectedEmployee(employee);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
      
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>

      {selectedEmployee ? (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">{selectedEmployee.nameVal}</h2>
          <p><strong>Position:</strong> {selectedEmployee.positionVal}</p>
          <p><strong>Email:</strong> {selectedEmployee.emailVal}</p>
          <p><strong>SID:</strong> {selectedEmployee.SID}</p>
          {/* Add any additional fields you want to display */}
        </div>
      ) : (
        <p className="mt-6 text-gray-600">No employee selected. Please search for an employee.</p>
      )}
    </div>
  );
};

export default AdminPanel;
