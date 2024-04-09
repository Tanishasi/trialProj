import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext'; // Import the UserAuth context
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const BuyerProfileChart = () => {
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
          const filteredData = data.filter((data) => user.email == data.Email);
          setFilteredData(filteredData);
          setFilteredDataCount(filteredData.length);
          console.log("first",filteredData);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
console.log(filteredDataCount)
  // Render the component only when data is received


  const data = [
    { name: 'Present', value: { filteredDataCount } },
    { name: 'Total', value: 30 },
  ];

  const RADIAN = Math.PI / 180;
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Attendance</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BuyerProfileChart;
