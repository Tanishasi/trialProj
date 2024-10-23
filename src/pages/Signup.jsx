import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';

const Signup = () => {
    const [rememberLogin, setRememberLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = UserAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [error, setError] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            // Optionally save additional details to Firestore
            const userDoc = {
                name,
                email,
                phone,
                dob,
                designation,
                profilePicture,
            };
            await addDoc(collection(db, 'users'), userDoc);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleUpload = (file) => {
        const storageRef = ref(storage, `profile/${v4()}`);
        uploadBytes(storageRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(url => {
                setProfilePicture(url); // Store the URL for the profile picture
            });
        }).catch(error => {
            console.error('Error uploading profile picture:', error);
        });
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='mt-16 max-w-md w-full bg-white rounded-lg shadow-lg p-8'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Sign Up</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleFormSubmit} className='flex flex-col'>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className='p-3 my-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                        type='text'
                        placeholder='Full Name'
                        required
                    />
                    <input
                        className='p-3 my-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                        type='email'
                        placeholder='Email'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className='p-3 my-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                        type='password'
                        placeholder='Password'
                        autoComplete='new-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        onChange={(e) => setDob(e.target.value)}
                        className='p-3 my-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                        type='date'
                        placeholder='Date of Birth'
                        required
                    />
                    <input
                        onChange={(e) => setPhone(e.target.value)}
                        className='p-3 my-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                        type='tel'
                        placeholder='Phone Number'
                        required
                    />
                    <input
                        onChange={(e) => setDesignation(e.target.value)}
                        className='p-3 my-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
                        type='text'
                        placeholder='Designation'
                        required
                    />
                    <input
                        placeholder='Profile Picture'
                        type='file'
                        onChange={handleFileChange}
                        accept='image/*'
                        className='p-2 my-2 border border-gray-300 rounded focus:outline-none'
                    />
                    <button className='bg-blue-900 py-3 my-6 rounded font-bold text-white hover:bg-blue-700 transition'>
                        Sign Up
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
                        <p className='text-sm'>Need Help?</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
