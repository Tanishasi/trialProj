import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { addDoc, collection, getDocs,getDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
    const [userID, setUserID] = useState('');
    const [rememberLogin, setRememberLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('');
    const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
    const [img, setImg] = useState('');
    const {signUp } = UserAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [agency, setAgency] = useState('');
    const [experience, setExperience] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAdd] = useState('');
    const [error, setError] = useState(null);
    const [data, setData] = useState([])


    const { user } = UserAuth();
    console.log('ixxxx',user)


    const generateUserID = () => {
        // Generate a random 3-digit number
        const randomID = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        // Combine with prefix 'sg'
        return 'sg' + randomID;
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await signUp(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };


    // useEffect(() => {
    //     const fetchUserID = async () => {
    //         if (user) {
    //             const userDocRef = doc(db, 'users', user.uid);
    //             const userDocSnap = await getDoc(userDocRef);
    //             if (userDocSnap.exists()) {
    //                 const userData = userDocSnap.data();
    //                 setUserID(userData.userID);
    //             }
    //         }
    //     };
    //     fetchUserID();
    // }, [user]);
    const handleAgencyChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedAgency(selectedValue);
        setShowExperienceDropdown(selectedValue === 'Security Agency');
        setAgency(selectedValue);
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }
    };

    const handleUpload = (e) => {
        const imgs = ref(storage, `profile/${v4()}`);
        uploadBytes(imgs, e.target.files[0]).then(data => {
            getDownloadURL(data.ref).then(val => {
                setImg(val)
            })
        })
    }


    const handleClick = async () => {
console.log('imaage',img)
        const cususerID = generateUserID(); 
        const userDocRef = collection(db, 'details');
        try {
            if (img && typeof img === 'string') {
               
                await addDoc(userDocRef, {
                    nameVal: name,
                    agencyVal: agency,
                    experienceVal: experience,
                    dobVal: dob,
                    addressVal: address,
                    profileUrl: img,
                    emailVal:email,
                    SID:cususerID,
                });
                alert("Added successfully");
            } else {
                alert("NOT");

                setError("Please upload a profile picture");
            }
        } catch (err) {
            console.error('Error adding document to Firestore:', err);
            setError(err.message);
        }
    };
    
    
    

    return (
        <>
        {user ?<p>already user</p>:
        <div className='relative '>
            <div className='mt-[10%] ml-[30%]'>
                <div className='max-w-xl w-full h-screen bg-black/70 rounded-lg p-8 overflow-y-auto'>
                    <h1 className='text-2xl font-bold text-white mb-6 text-center'>Sign up</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleFormSubmit} className='flex flex-col'>
                        <input onChange={(e) => setName(e.target.value)}
                            className='p-3 my-2 bg-gray-300 rounded'
                            type='text'
                            placeholder='Name'
                        />
                        <div className="relative w-full lg:max-w-sm">
                            <select
                                value={selectedAgency}
                                onChange={handleAgencyChange}
                                placeholder='Position'
                                className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                            >
                                <option value="" disabled>Select Agency</option>
                                <option value="Security Agency">Security Agency</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {showExperienceDropdown && (
                            <select onChange={(e) => setExperience(e.target.value)}
                                placeholder='Experience'
                                className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                            >
                                <option value="">Select Experience</option>
                                <option value="0-1">0-1 Fresher</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="experienced">Experienced</option>
                            </select>
                        )}
                        <input onChange={(e) => setDob(e.target.value)}
                            className='p-3 my-2 bg-gray-300 rounded'
                            type='date'
                            placeholder='DOB'
                        />
                        <input onChange={(e) => setAdd(e.target.value)}
                            className='p-3 my-2 bg-gray-300 rounded'
                            type='text'
                            placeholder='Enter permanent address'
                        />
                        <input
                            className='p-3 my-2 bg-gray-300 rounded'
                            type='email'
                            placeholder='Email'
                            autoComplete='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className='p-3 my-2 bg-gray-300 rounded'
                            type='password'
                            placeholder='Password'
                            autoComplete='new-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            className='p-3 my-2 bg-gray-300 rounded'
                            type='password'
                            placeholder='Confirm Password'
                            autoComplete='new-password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <p className='text-white'>Profile picture</p>
                        <input placeholder='Profile picture' type='file' onChange={(e) => handleUpload(e)} accept='image/*' className='p-2' />
                        {img && typeof img === 'string' && (
                            <div className="mb-6">
                                <img src={img} alt="Profile" className="w-20 h-20 rounded-full mx-auto" />
                            </div>
                        )}
                        <button onClick={handleClick} className='bg-blue-900 py-3 my-6 rounded font-bold text-white'>
                            Sign up
                        </button>
                        <div className='flex justify-between items-center text-gray-600'>
                            <label>
                                <input
                                    type='checkbox'
                                    className='mr-2'
                                    checked={rememberLogin}
                                    onChange={() => setRememberLogin(!rememberLogin)}
                                />
                                Remember me
                            </label>
                            <p>Need Help?</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>}
        </>
    );
};

export default Signup;
