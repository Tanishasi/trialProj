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
            <div className='bg-blue-900 text-white h-14 flex items-center justify-between px-4'>
                {/* Mobile Menu Button (Hamburger icon) */}
                <div className='md:hidden'>
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

                {/* Logo and Campus SMS - visible when logged out */}
                <div className='flex items-center'>
                    {!user?.email && (
                        <>
                            <img src="https://i.postimg.cc/fRrWVYhL/bit.png" alt="Logo" className='h-10 w-10 mr-4' /> {/* Replace with your logo */}
                            <h2 className='text-lg md:text-xl font-bold'>Campus Security Management System</h2>
                        </>
                    )}
                </div>

                {/* Navbar Links for Desktop View (Only shown if logged in) */}
                <div className='hidden md:flex items-center space-x-6'>
                    {user?.email && (
                        <>
                            <Link to="/" className='text-white text-sm md:text-lg'>Home</Link>

                        </>
                    )}
                </div>

                {/* Right-side Login and Sign Up (Show only when logged out) */}
                <div className='hidden md:flex items-center space-x-4'>
                    {user?.email ? (
                        <button onClick={handleLogout} className='bg-slate-50 text-black px-4 py-1 rounded'>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/" className='text-white text-sm md:text-lg'>Login</Link>
                            <Link to="/signup">
                                <button className='bg-white text-black text-sm md:text-lg py-1 px-4 rounded'>
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Sidebar for mobile view */}
            {sidebarOpen && (
                <div className="md:hidden bg-blue-900 text-white h-full text-sm fixed top-14 left-0 w-56 flex flex-col z-20">
                    {/* Links to display in the sidebar */}
                    {user?.email ? (
                        <>
                            <Link to="/" className='p-4 hover:bg-blue-700' onClick={toggleSidebar}>Home</Link>
                            <Link to="/schedule" className='p-4 hover:bg-blue-700' onClick={toggleSidebar}>Schedule</Link>
                            <Link to="/salary" className='p-4 hover:bg-blue-700' onClick={toggleSidebar}>Salary</Link>
                            <Link to="/attendance" className='p-4 hover:bg-blue-700' onClick={toggleSidebar}>Attendance</Link>
                            <button onClick={handleLogout} className='p-4'>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className='p-4 hover:bg-blue-700' onClick={toggleSidebar}>Login</Link>
                            <Link to="/signup" className='p-4 hover:bg-blue-700' onClick={toggleSidebar}>Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar1;
