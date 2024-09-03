import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar2 = () => {
    const { user } = UserAuth();
    const isAdmin = user?.email === 'admin@bitmesra.com';

    return (
        <>
            { user?.email && (
                <div className="absolute top-[15%] left-0 h-full w-[25%] flex flex-col">
                    {/* Box with image and user info */}
                    <div className="flex flex-col w-[80%] md:w-[80%] lg:w-[80%] shadow-lg bg-white border-t-2 py-4">
                        <div className="flex justify-center">
                            <img 
                                src="https://th.bing.com/th/id/R.6c9e8d549c29a19173e9ad2ba5d9d6dc?rik=u8%2ffeDWK0X%2bFKQ&riu=http%3a%2f%2fservices.bitmesra.ac.in%2flogo%2fbit-newlogo.png&ehk=iAZkrPum56DincLE%2fWHHmVhuoEhFjrYWT8XAmUlbauQ%3d&risl=&pid=ImgRaw&r=0" 
                                alt="Logo" 
                                className="max-h-[60px] max-w-[60px]" 
                            />
                        </div>
                        <div className="text-left mt-4 px-4 text-xs">
                            <p>Name: {user.name}</p>
                            <p>Age: {/* Placeholder for age */}</p>
                        </div>
                    </div>

                    {/* Dashboard links */}
                    <div className="flex-grow flex flex-col border-t border-gray-300 w-[80%] md:w-[80%] lg:w-[80%] mt-4">
                        <div className="text-center border-gray-300 flex-grow overflow-y-auto">
                            <div className="mb-2 py-2 border-b">
                                <Link to='/dashboard'>Dashboard</Link>
                            </div>
                            <div className="mb-2 py-2 border-b">
                                <Link to='/profile'>Profile</Link>
                            </div>
                            <div className="mb-2 py-2 border-b">
                                <Link to='/salary'>Salary</Link>
                            </div>
                            <div className="mb-2 py-2 border-b">
                                <Link to='/leave'>Request Leave</Link>
                            </div>
                            <div className="mb-2 py-2 border-b">
                                <Link to='/attendance'>Attendance</Link>
                            </div>
                            <div className="mb-2 py-2 border-b">
                                <Link to='/schedule'>Schedule</Link>
                            </div>
                            <div className="mb-2 py-2 border-b">
                                <Link to='/dashboard'>Help</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar2;
