import React, { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Access the form data here using the formData state
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://localhost:8000/api/v1/userauth/login/', formData)
            console.log('Login successful: ', response.data)
            const token = response.data.tokens.access
            const role = response.data.role
            Cookies.set('jwt', token, { expires: 1 })

            if (role == 0)
                navigate('/producer ')
            else if (role == 1)
                navigate('/wholeseller')
            else
                navigate('/retailer')
        } catch (error) {
            console.log('Login error: ', error.response)
        }
        // You can perform further actions, such as sending the data to a server
    };

    return (
        <>
            <div className="login w-full max-w-xl">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            id="password"
                            type="password"
                            placeholder="******************"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Samriddhi Inc. All rights reserved.
                </p>
            </div>
        </>
    );
};

export default Login;
