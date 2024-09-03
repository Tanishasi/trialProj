import React from 'react';
import { FaMoneyBillWave, FaCalendarCheck } from 'react-icons/fa';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  // Example static data for salary and leaves
  const currentMonthSalary = 3500;
  const currentMonthLeaves = 5;

  // Attendance Pie Chart options
  const attendanceChartOptions = {
    series: [44, 55, 13, 43],
    chart: {
      type: 'pie',
      background: 'transparent',
      height: 200,
    },
    labels: ['Present', 'Absent', 'Late', 'Excused'],
    colors: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f'],
    legend: {
      labels: {
        colors: '#2c3e50',
      },
      position: 'bottom',
    },
    tooltip: {
      theme: 'light',
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar Placeholder */}
      <div className="bg-blue-500 text-white p-4 text-center fixed w-full top-0 left-0 z-10">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 mt-16 ml-[20%] flex flex-col items-center">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 w-full max-w-4xl">
          {/* Attendance Pie Chart */}
          <div className="p-4 rounded-lg shadow-md bg-white flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Attendance Overview</h2>
            <Chart options={attendanceChartOptions} series={attendanceChartOptions.series} type="pie" height={200} />
          </div>

          {/* Salary Block */}
          <div className="p-4 rounded-lg shadow-md bg-white flex flex-col items-center">
            <FaMoneyBillWave className="text-4xl text-blue-500 mb-2" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Salary Overview</h2>
            <p className="text-2xl font-bold text-gray-800">${currentMonthSalary}</p>
            <p className="text-gray-600">This Month's Salary</p>
          </div>

          {/* Leaves Block */}
          <div className="p-4 rounded-lg shadow-md bg-white flex flex-col items-center">
            <FaCalendarCheck className="text-4xl text-green-500 mb-2" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Leaves Overview</h2>
            <p className="text-2xl font-bold text-gray-800">{currentMonthLeaves} Days</p>
            <p className="text-gray-600">This Month's Leaves</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
