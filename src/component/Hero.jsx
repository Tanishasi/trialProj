import React, { useState } from 'react';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/Login';
import Navbar1 from './Navbar1';
import { InputGroup1Presentation } from './QueryForm';
import { FooterWithLogo } from './FooterWithLogo';

const Hero = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      
        <Navbar1 />
<div className='hidden md:block md:ml-[69%] '>
<Login />
</div>
        <div className='absolute inset-0 w-screen top-[8%]'>
          <img
            className='absolute inset-0 w-full md:h-screen h-[760px] object-cover z-10 md:w-screen lg:w-screen xl:w-screen 2xl:w-screen'
            src='https://i.postimg.cc/xj5MSY77/bitmesra.png'
            alt='BIT MESRA'
          />

          <div className='  w-screen mt-[20px] ml-[5%] relative z-10 md:top-[8%] xl:top-[8%] lg:top-[8%]'>
            <h1 className='ml-1 text-1xl md:text-5xl font-nsans-bold  text-gray-400'>Welcome</h1>
            <p className='px-1 text-gray-200 mt-2 text-sm md:text-xl '>To campus security management System</p>
            <p className='px-1 w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2  text-xs  md:text-sm'>
              Institute Vision
              To become a globally recognized academic institution in consonance with the social, economic and ecological environment, striving continuously for excellence in education, research and technological service to the national needs.
            </p>
            {showMore && (
              <>
                <p className='px-1 w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2 text-xs md:text-sm'>
                  Our Goals:
                </p>
                <p className='px-1 w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2 text-xs md:text-sm'>
                  1. Ensuring the safety of our students, faculty, and staff.
                </p>
                <p className='px-1 w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2 text-xs md:text-sm'>
                  2. Implementing advanced security measures to prevent unauthorized access and maintain order on campus.
                </p>
                <p className='px-1 w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2 text-xs md:text-sm'>
                  3. Providing timely assistance in emergencies through a well-coordinated security response system.
                </p>
                <p className='px-1 w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2 text-xs md:text-sm'>
                  4. Experienced security professionals oversee various aspects of campus security, ensuring effective deployment of resources and implementation of security protocols.
                </p>
                <p className='px-1 w-full md:max-w-[60%] sm:max-w-[90%] text-gray-200 mt-2 text-xs md:text-sm'>
                  5. Fostering awareness and preparedness regarding security issues among all stakeholders.
                </p>
              </>
            )}
            <button className="text-blue-500 mt-2" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Read Less" : "Read More"}
            </button>
            <div className='md:hidden'>
            <Login /> {/* Place the Login component here */}
         </div>
         
          </div>
          
        </div>
      
      
      <section className='message relative mt-[800px] md:mt-[500px] lg:mt-[450px] '>
      <div className=' relative  md:mt-[]'>
          <AboutUs/>
        </div>
      </section>
      <section className='query relative '>
        <div >
          <InputGroup1Presentation/>
        </div>
      </section>
      <section className='foot relative '>
        <div >
          <FooterWithLogo/>
        </div>
      </section>
    </div>
  );
};

export default Hero;
