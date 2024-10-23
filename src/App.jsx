import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Attendance from './pages/Attendance';
import Salary from './pages/Salary';
import Navbar1 from './component/Navbar1';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import Navbar2 from './component/Navbar2';
import Leave from './pages/Leave';
import StoreImageTextFirebase from './pages/StoreImageTextFirebase';
import AboutUs from './pages/AboutUs';
// import AdminPanel from './component/AdminPanel';

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Navbar1 />
        <Navbar2 />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/salary' element={<Salary />} />
          <Route path='/leave' element={<Leave />} />
          <Route path='/Aboutus' element={<AboutUs />} />
          {/* <Route path='/admin' element={<AdminPanel />} /> */}
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
