import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import SaleHistory from '../components/SaleHistory';

const Producer = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        number: '',
        pan: '',
        address: ''
    });

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/producer/saleform', { state: { userInfo } });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('jwt');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('http://localhost:8000/api/v1/userauth/', config);
                
                // Assuming response.data contains the user info
                setUserInfo({
                    name: response.data.name,
                    email: response.data.email,
                    number: response.data.mobile_number,
                    pan: response.data.pan_number,
                    address: response.data.address
                });
             

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);
// console.log(userInfo);
    return (
        <>
            <Header props={userInfo}/>
            {/* <Link props={userInfo} to="/producer/saleform">
                <button className="text-black border border-black font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-purple-300 bg-purple-700">Add Entry</button>
            </Link> */}
            <button 
                onClick={handleNavigate}
                className="text-black border border-black font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-purple-300 bg-purple-700"
            >
                Add Entry
            </button>
   
            <h1 className="m-10 text-center">Sale History</h1>
            <SaleHistory />
        </>
    );
};

export default Producer;
