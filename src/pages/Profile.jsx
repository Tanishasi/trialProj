import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../services/firebase';

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const { user } = UserAuth();

  useEffect(() => {
    // Fetch profile image URL from storage
    const imageRef = ref(storage, `profilePictures/${user.uid}`);
    getDownloadURL(imageRef)
      .then((url) => {
        setProfilePicture(url); 
      })
      .catch((error) => {
        console.log('Error fetching profile image:', error);
      });
  }, [user.uid]);

  const enableEdit = () => {
    setIsEditMode(true);
  };

  const updateProfile = () => {
    // Logic to update profile goes here
    // For demonstration purposes, let's alert a message
    alert('Profile updated successfully');
    setIsEditMode(false);
  };

  return (
    <div className="flex justify-center items-center h-[50%] mt-[6.9%]">
      <div className="w-full max-w-lg  ">
        <div id="profile" className=" border border-gray-200 rounded px-20 py-8  min-w-[170%]  ">
          <h2 className="text-center mb-4">Profile</h2>
          {profilePicture && <img src={profilePicture} alt="Profile Avatar" className="logo max-w-xs rounded-full mx-auto mb-4" />}
          <label htmlFor="sid"></label>
          <p className="text-sm">{user.uid}</p>
          <form id="profileForm">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              readOnly={!isEditMode}
              className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
            />
            {/* Other input fields */}
            {isEditMode ? (
              <button
                type="button"
                onClick={updateProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={enableEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
