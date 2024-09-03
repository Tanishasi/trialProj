import React from 'react';
import { Typography } from "@material-tailwind/react";

export function FooterWithLogo() {
  return (
    <footer className="w-full bg-white p-9">
      <div className="flex flex-row w-screen flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between text-black">
        <img 
          src="https://yt2.ggpht.com/a/AATXAJwOzthsWc__jFGypZvbWTdrVKBNCsMIv-Y6ofuk=s900-c-k-c0xffffffff-no-rj-mo" 
          alt="logo-ct" 
          className="ml-8" // Move logo to the right
        />
        <ul className="flex flex-wrap items-center gap-y-3 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-501 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-501 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-501 focus:text-blue-500"
            >
              Query
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-501 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-9 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal md:text-left md:ml-8">
        &copy; 2023 Tanisha Sinha MCA
      </Typography>
    </footer>
  );
}

