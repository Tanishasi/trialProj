import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const Profile = () => {
    const { user } = UserAuth();
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
    console.log(result);

    return (
        <>
            {result.length > 0 ? (
                <div className="absolute left-[35%] w-[75%] top-[15%] lg:left-[20%] p-6 bg-slate-100 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row items-start">
                        {/* Profile Picture and Basic Info */}
                        <div className="md:w-1/3 text-center md:text-left mb-6 md:mb-0">
                            <img src={result[0].profileUrl} alt="Profile" className="w-[150px] h-[150px] rounded-full mx-auto md:mx-0 mb-4 border-2 border-gray-300" />
                            <h2 className="text-2xl font-bold mb-2">{result[0].nameVal}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>

                        {/* Profile Details */}
                        <div className="md:w-2/3">
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <FaBriefcase className="text-blue-500 text-xl mr-3" />
                                    <div>
                                        <label className="block font-semibold text-lg">Experience</label>
                                        <p className="border rounded-md p-2 bg-white border-gray-300">{result[0].experienceVal}</p>
                                    </div>
                                </div>

                                <div className="flex items-center mb-4">
                                    <FaMapMarkerAlt className="text-blue-500 text-xl mr-3" />
                                    <div>
                                        <label className="block font-semibold text-lg">Address</label>
                                        <p className="border rounded-md p-2 bg-white border-gray-300">{result[0].addressVal}</p>
                                    </div>
                                </div>

                                <div className="flex items-center mb-4">
                                    <FaCalendarAlt className="text-blue-500 text-xl mr-3" />
                                    <div>
                                        <label className="block font-semibold text-lg">DOB</label>
                                        <p className="border rounded-md p-2 bg-white border-gray-300">{result[0].dobVal}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Sections or Actions */}
                            <div className="mt-5 flex justify-center">
                                {/* Additional actions, if any */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="absolute left-[35%] w-[75%] top-[15%] lg:left-[20%] p-6 bg-slate-100 rounded-lg shadow-md text-center">
                    <p>Loading profile data...</p>
                </div>
            )}
        </>
    );
};

export default Profile;
