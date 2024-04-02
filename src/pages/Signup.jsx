import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { addDoc, collection,getDocs } from 'firebase/firestore'

const Signup = () => {
    const [rememberLogin, setRememberLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('');
    const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const { user, signUp } = UserAuth();
    const navigate = useNavigate();
    const[name,setName]=useState('')
    const[agency,setAgency]=useState('')
    const[experience,setExperience]=useState('')
    const[dob,setDob]=useState('')
    const[address,setAdd]=useState('')
const[data,setData]=useState('')
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }
        try {
            await signUp(email, password);
            navigate('/signup');
        } catch (err) {
            console.log(err);
        }
        const imageRef = ref(storage, "profilePicture");
        uploadBytes(imageRef, profilePicture).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url);
            }).catch(error => {
                console.log(error.message, "error getting the image url");
            });
            setProfilePicture(null);
        }).catch(error => {
            console.log(error.message);
        });
    };
    const getData=async()=>{
        const valRef=collection(db,'details')
      const dataDb=await getDocs(valRef)
     const allData= dataDb.docs.map(val=>({...val.data(),id:val.id}))
     setData(allData)
      console.log(dataDb)
      }
      useEffect(()=>{getData()},[])
      console.log(data,'datadata')
    const handleAgencyChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedAgency(selectedValue);
        setShowExperienceDropdown(selectedValue === 'Security Agency');
        setAgency(selectedValue);
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
        }
    };
    
    const handleUpload = (e) => {
        console.log(e.target.files[0])
        const pp = ref(storage,`${v4()}`)
        uploadBytes(imgs, e.target.files[0]).then(data=>{
            console.log(data,'pp')
            getDownloadURL(data.ref).then(val=>{
                setImg(url)
            })
        })}
        const handleClick=async()=>{
            const valRef=collection(db,'details')
            await addDoc(valRef,{nameVal:name,profilUrl:profilePicture})
            alert("added successfully")
          }
    
    

    return (
        <div className='relative '>
            <div className='mt-[10%] ml-[30%]'>
                <div className='max-w-xl w-full h-screen bg-black/70 rounded-lg p-8 overflow-y-auto'>
                    <h1 className='text-2xl font-bold text-white mb-6 text-center'>Sign up</h1>
                    <form onSubmit={handleFormSubmit} className='flex flex-col'>
                        <input onChange={(e)=>setName(e.target.value)} 
                            className='p-3 my-2 bg-gray-300 rounded'
                            type='tect'
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
                        <input placeholder='Profile picture' type='file' onChange={handleFileChange} accept='image/*' className='p-2' />
                        {profilePicture && (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-20 h-20 rounded-full mx-auto" />
                            </div>
                        )}
                        <button onClick={handleClick} className='bg-blue-950 py-3 my-6 rounded font-bold text-white'>
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
