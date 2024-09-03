import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-100 p-5  ">
      <h5 className="mb-6 text-center">Our Security &mdash; System</h5>

      <div className="flex flex-col space-y-6">
        <BoxWrapper>
          <div className="flex flex-col items-center">
            <img src="your_image_url_here" alt="Security Team" className="w-20 h-20 rounded-full mb-4" />
            <div className="text-lg italic">"Just dropping a quick note to inform you ttopr security team is working diligently to enhance safety measures across campus. Your safety is our priority."</div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="flex flex-col items-center">
            <img src="your_image_url_here" alt="Security Team" className="w-20 h-20 rounded-full mb-4" />
            <div className="text-lg italic">"Just dropping a quick note to inform you that our security team is working diligently to enhance safety measures across campus. Your safety is our priority."</div>
          </div>
        </BoxWrapper>
      </div>
    </div>
  );
};

function BoxWrapper({ children }) {
  return <div className="w-[340px] bg-white rounded-sm p-8 border border-gray-200">{children}</div>;
}

export default AboutUs;
