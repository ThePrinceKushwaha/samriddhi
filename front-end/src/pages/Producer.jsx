import React from 'react'
import { Link } from 'react-router-dom';

import Header from '../components/Header'
import SaleHistory from '../components/SaleHistory'

import { Button } from "@material-tailwind/react";

const Producer = () => {
    return (
        <>
            <Header />
            <Link to="/producer/saleform">
                <button className="text-black border border-black font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-purple-300 bg-purple-700">Add Entry</button>
            </Link>
            <h1 className="m-10 text-center">Sale History</h1>
            <SaleHistory />
        </>
    )
}

export default Producer