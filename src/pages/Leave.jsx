import React from 'react'
import { UserAuth } from '../context/AuthContext'

const Leave = () => {
  const { user } = UserAuth()
  return (
    <div className="no-overflow-hidden flex justify-center items-center h-[50%] mt-[6.9%] ">
      <div className="w-full max-w-lg ">
        <div id="Leave" className=" shadow-md border border-gray-200 rounded px-8 py-8 w-[170%]">
          <h2 className="text-center mb-4">Request Leave</h2>
          <div className="text-center mb-4">
            <img src="guard_avatar.jpg" alt="Guard Avatar" className="max-w-xs rounded-full mx-auto mb-4" />
            <p className="text-sm">{user.uid}</p>
          </div>
          <form id="profileForm" className="space-y-4">
            <div>
              <label htmlFor="name" className="block">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value="Guard"
                className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <label htmlFor="position" className="block">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                value="Security Guard"
                className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <label htmlFor="leaveType" className="block">Leave Type:</label>
              <select id="leaveType" name="leaveType" required className="block w-full px-4 py-2 border border-gray-300 rounded mb-4">
                <option value="vacation">Vacation</option>
                <option value="sick">Sick Leave</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block">Start Date:</label>
              <input type="date" id="startDate" name="startDate" required className="block w-full px-4 py-2 border border-gray-300 rounded mb-4" />
            </div>
            <div>
              <label htmlFor="endDate" className="block">End Date:</label>
              <input type="date" id="endDate" name="endDate" required className="block w-full px-4 py-2 border border-gray-300 rounded mb-4" />
            </div>
            <div>
              <label htmlFor="reason" className="block">Reason for Leave:</label>
              <textarea id="reason" name="reason" rows="4" required className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Leave
