import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Login = () => {
    const [rememberLogin, setRememberLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, logIn } = UserAuth();
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Log in the user
            await logIn(email, password);
            
            // Check if the user's email matches the specific admin email
            if (email === 'admin@bitmesra.com') {
                // Redirect the user to the admin page
                navigate('/AdminDashboard');
            } else {
                // Redirect the user to the dashboard
                navigate('/dashboard');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
    <div className='relative top-3 left-0 sm:left-44 md:top-[145px] lg:mt-10 lg:left-[12%] xl:top-[100px] xl:left-[12%] z-30'>
            <div className='flex'>
                <div className='w-[250px] h-[260px] md:h-[350px] md:w-[300px] bg-black/70 rounded-lg p-4' >
                    <div className='max-w-[320px] pt-4'>
                        <h1 className='text-1xl font-bold md:p-2 pl-8 md:text-center text-white'>Login</h1>
                        <form onSubmit={handleFormSubmit} className='flex flex-col md:p-2 py-4 px-8'>
                            <input
                                className='p-1 my-2 bg-gray-300 rounded'
                                type='email'
                                placeholder='Email'
                                autoComplete='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className='p-1 my-3 bg-gray-300 rounded'
                                type='password'
                                placeholder='Password'
                                autoComplete='current-password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className='text-xs md:text-lg bg-blue-900 py-1 my-3 rounded font-bold text-white'>
                                Login
                            </button>
                            <div className='flex justify-between items-center text-gray-600 md:text-sm text-xs'>
                                <label>
                                    <input
                                        type='checkbox'
                                        className='mr-2'
                                        checked={rememberLogin}
                                        onChange={(e) => setRememberLogin(!rememberLogin)}
                                    />
                                    <span className="text-xs md:text-sm">Remember me</span>
                                </label>
                                <p>Need Help?</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
