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
    const [error, setError] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
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
                // Use the URL for profile picture
            });
        }).catch(error => {
            console.error('Error uploading profile picture:', error);
        });
    }

    return (
        <div className='relative'>
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
                            placeholder='Profile picture'
                            type='file'
                            onChange={(e) => handleFileChange(e)}
                            accept='image/*'
                            className='p-2'
                        />
                        <button className='bg-blue-900 py-3 my-6 rounded font-bold text-white'>
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
        </div>
    );
};

export default Signup;
