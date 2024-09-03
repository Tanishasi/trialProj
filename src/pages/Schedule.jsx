import React from 'react';

const Schedule = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Main Container with 20% margin from top and left */}
      <div className="absolute top-0 left-0 w-full h-full p-6" style={{ marginTop: '20%', marginLeft: '20%' }}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Schedule Display Section */}
          
          {/* Uploaded File Display Section */}
          <div className="flex justify-center lg:justify-end w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <div className="w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Uploaded Schedule File</h2>
              <p className="text-gray-600 mb-4">The file uploaded by the admin will be shown here.</p>
              <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 text-center">
                {/* Placeholder for file display */}
                <p className="text-gray-600">No file uploaded yet.</p>
                {/* Example file display */}
                {/* <iframe src="path-to-uploaded-file" className="w-full h-64" title="Uploaded File"></iframe> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
