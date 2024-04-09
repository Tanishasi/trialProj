import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';

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
console.log(result)
    return (
        <>
            {result.length > 0 ? (
                <div className="container rounded bg-white mt-10 ml-20 mb-5 p-5">
                    <div className="mt-[8%] ml-[20%] grid grid-cols-1 md:grid-cols-3 gap-4">
                       
                        <div className="col-span-2 md:border-r md:border-gray-300 mb-6">
                            <div className="p-3 py-5">
                            <div className="flex items-center justify-center w-full h-16 border-b">
              {/* Assuming user.profilePic is the URL of the profile picture */}
              <img src={result[0].profileUrl} alt="Profile" className="w-[100px] h-[100px] rounded-full" />
            </div>
                                <div className="flex justify-between items-center mb-3 mt-20">
                                    <h4 className="text-right">Profile</h4>
                                </div>
                                <div className="mb-6">
                                    <div className="mb-6">
                                        <label className="block font-semibold">Name</label>
                                        <span className="border rounded-md p-2">{result[0].nameVal}</span>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block font-semibold">Email</label>
                                        <span className="border rounded-md p-2">{user.email}</span>
                                    </div>
                                    <div className="mb-6"></div>
                                </div>
                                <div className="mt-5 flex justify-center">
                                  
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="py-5">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold">Experience</span>
                                    <span className="border rounded-md px-3 py-1">{result[0].experienceVal}</span>
                                </div>
                                <div>
                                    <label className="block font-semibold">Address</label>
                                    <span className="border rounded-md p-2">{result[0].addressVal}</span>
                                </div>
                                <div>
                                    <label className="block font-semibold">DOB</label>
                                    <span className="border rounded-md p-2">{result[0].dobVal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Fetching</h1>
            )}
        </>
    );
};

export default Profile;
