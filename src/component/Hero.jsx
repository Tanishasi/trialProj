import React from 'react';

const Hero = () => {
  return (
    <div className='w-full h-screen fixed mt-[-1.6%]'>
      {/* Image */}
      <img
        className='absolute inset-0 w-full h-full object-cover'
        src='src/assets/bitmesra.jpg'
        alt='BIT MESRA'
      />
      <div className='absolute inset-0 bg-black opacity-50'></div>
      {/* Text container */}
      <div className='absolute top-0 left-0 w-full mt-20 ml-[5%]'>
        <h1 className='text-3xl md:text-6xl font-nsans-bold text-gray-400'>Welcome</h1>
        <p className='text-gray-200 mt-2'>To campus security management System</p>
        <p className='w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2 text-sm'>
          Institute Vision
          To become a globally recognized academic institution in consonance with the social, economic and ecological environment, striving continuously for excellence in education, research and technological service to the national needs.
        </p>
        <p className='w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2 text-sm'>
          1. To educate students at Undergraduate, Post Graduate, Doctoral and Post Doctoral levels to perform challenging engineering and managerial jobs in industry
        </p>
        {/* More paragraphs */}
      </div>
    </div>
  );
};

export default Hero;
