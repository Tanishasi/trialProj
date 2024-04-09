import React,{useState,useEffect } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import { UserAuth } from '../context/AuthContext'; // Import the UserAuth context

const DashboardStatsGrid = () => {
    const [Salary, setSalary] = useState(0);
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
            if (Array.isArray(data)) {
              const filteredData = data.filter((data) => user.email === data.Email);
              setFilteredDataCount(filteredData.length);
              calculateSalary(filteredData.length);
            } else {
              console.error('Data is not in the expected format:', data);
            }
          })
          .catch((error) => console.error('Error fetching data:', error));
      };
    
    console.log('length',filteredDataCount)
    const calculateSalary = () => {
      const salary = filteredDataCount * 700;
      setSalary(salary);
    };
  console.log(Salary)
  
    return (
    <div className="flex gap-4 ml-[20%]">
    <BoxWrapper>
        
     
    </BoxWrapper>
    <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
            <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Salary</span>
            <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">{Salary}</strong>
                <span className="text-sm text-green-500 pl-2">+</span>
            </div>
        </div>
    </BoxWrapper>
    <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
            <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Leaves</span>
            <div className="flex items-center">
                <strong classNasavame="text-xl text-gray-700 font-semibold">0</strong>
                <span className="text-sm text-red-500 pl-2"></span>
            </div>
        </div>
    </BoxWrapper>
    <BoxWrapper>
    </BoxWrapper>
</div>
  )
}
function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
export default DashboardStatsGrid
