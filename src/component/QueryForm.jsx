import React from 'react';

function InputGroup1({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled,
}) {
  return (
    <div className="relative z-0 w-full">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`peer block py-2.5 px-1 w-full text-sm text-gray-600 bg-transparent border-0 border-b-[2px] appearance-none focus:outline-none focus:ring-0 focus:border-[#FF6464] ${
          disabled ? "border-gray-300" : "border-gray-400"
        } hover:border-[#FF6464]`}
        placeholder=" "
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FF6464] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
      >
        {label}
      </label>
    </div>
  );
}

function InputGroup1Presentation() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-white w-[500px] p-5 sm:p-10 gap-8 rounded-md border border-gray-200 hover:border-[#FF6464] transition duration-300">
        <h1 className="text-center text-2xl font-bold mb-4">Ask us your doubts</h1>
        <InputGroup1 name="name" label="Name" />
        <InputGroup1 name="email" label="Email *" type="email" />
        <InputGroup1 name="query" label="Enter your Query *" type="text" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300">Submit</button>
      </div>
    </div>
  );
}

export { InputGroup1Presentation };
