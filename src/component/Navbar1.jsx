import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar1 = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className='bg-blue-900 text-white h-14 text-sm md:text-lg relative md:py-10'>
                <div className='md:hidden absolute top-4 left-3 flex items-center'>
                    <button className="text-white" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {sidebarOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                <div className='hidden md:flex items-center justify-between md:w-screen md:float-left md:ml-5 md:text-sm'>
                    {user?.email ? (
                        <div className='w-screen  mb-5'>
                            <Link to="/dashboard" className='mr-4'>Home</Link>
                            <Link to="/Schedule" className='mr-4'>Schedule</Link>
                            <Link to="/Salary" className='mr-4'>Salary</Link>
                            <Link to="/Attendance" className='mr-4 '>Attendance</Link>
                            <button onClick={handleLogout} className='lg:ml-[87%] bg-slate-50 text-black px-5  rounded md:ml-[85%]'>Logout</button>
                        </div>
                    ) : (
                        <div className='flex items-center'>
                            <div className='float-left mr-4'>
                            <Link to="/dashboard" className='mr-4'>Home</Link>
                            <Link to="/Schedule" className='mr-4'>Schedule</Link>
                            <Link to="/Salary" className='mr-4'>Salary</Link>
                            <Link to="/Attendance" className='mr-4 '>Attendance</Link>
                            </div>
                            <div className='float-right'>
                                <Link to="/login" className='mr-4'>Login</Link>
                                <button className='bg-white rounded text-black p-1 px-5' href="/signup">Sign Up</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {sidebarOpen && (
                <div className="md:hidden bg-blue-900 text-white h-full text-sm fixed top-14 left-0 w-56 flex flex-col z-20">
                    {user?.email ? (
                        <>
                            <Link to="/" className='p-4' onClick={toggleSidebar}>Home</Link>
                            <Link to="/login" className='p-4' onClick={toggleSidebar}>Messages</Link>
                            <Link to="/login" className='p-4' onClick={toggleSidebar}>About us</Link>
                            <Link to="https://www.bitmesra.ac.in/Visit_Other_Department_9910?cid=1&deptid=190&pid=85" className='p-4' onClick={toggleSidebar}>Staff</Link>
                            <button onClick={handleLogout} className='p-4'>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className='p-4' onClick={toggleSidebar}>Home</Link>
                            <Link to="/login" className='p-4' onClick={toggleSidebar}>Messages</Link>
                            <Link to="/login" className='p-4' onClick={toggleSidebar}>About us</Link>
                            <Link to="https://www.bitmesra.ac.in/Visit_Other_Department_9910?cid=1&deptid=190&pid=85" className='p-4' onClick={toggleSidebar}>Staff</Link>
                            <Link to="/login" className='p-4' onClick={toggleSidebar}>Login</Link>
                            <Link to="/signup" className='p-4' onClick={toggleSidebar}>Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar1;
