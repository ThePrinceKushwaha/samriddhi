import React, { useState } from "react";
import styled from 'styled-components';

const Signup = () => {
  const [formData, setFormData] = useState({
// name, email, username, role , mobile_number, pan_number, address, password

    uName: "",
    email: "",
    username: "",
    mobile_number:"",
    pan_number: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access the form data here using the formData state
    console.log("Form Data:", formData);
    // You can perform further actions, such as sending the data to a server
  };

  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="uName"
            placeholder="Bishal Poudel"
            value={formData.uName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="bishalpoudel12"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="bishalpoudel12@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="****************"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            name="mobile_number"
            placeholder="+977-9845798672"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            placeholder="Samriddhi"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            PAN/VAT No.
          </label>
          <input
            type="text"
            name="pan_number"
            placeholder="6875235697"
            value={formData.pan_number}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Dharan"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple text-white rounded-md hover:bg-indigo focus:outline-none focus:shadow-outline-indigo cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </>
  );
};
const SignupContainer = styled.div`
  width: 400px; // Set a fixed width for the container
  font-size: 1.2rem;

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
    align-items:center;
  }

  label {
    width: 100%; // Make labels take the full width
    margin-bottom: 4px;
    font-weight: bold;
  }

  input {
    width: 100%; // Make input fields take the full width
    outline: none;
    padding: 8px;
    border: 1px solid #0000000f;
  }

  button {
    @apply bg-purple text-white px-4 py-2 rounded-md cursor-pointer;
    margin-top: 14px; // Add margin between inputs and the button
  }

  button:hover {
    @apply bg-indigo;
  }
`;




export default Signup;
