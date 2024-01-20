import React from "react";
import { Link } from "react-router-dom";

const SaleHistory = () => {
    return (
        <>
            <div className="w-full my-10">
            <Link to="/retailer/saleform">
                <button className="text-black border border-black font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-purple-300 bg-purple-700">Add Entry</button>
            </Link>
                <ul class="text-sm font-medium text-gray-900 bg-gray-light border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li class="w-full px-4 py-2 border-b border-black rounded-t-lg dark:border-gray-600">
                        <h1>Porduct name</h1>
                        <p>Buyer: Buyer name</p>
                        <p>Date of sell</p>
                    </li>
                    <li class="w-full px-4 py-2 border-b border-black rounded-t-lg dark:border-gray-600">
                        <h1>Porduct name</h1>
                        <p>Buyer: Buyer name</p>
                        <p>Date of sell</p>
                    </li>
                    <li class="w-full px-4 py-2 border-b border-black rounded-t-lg dark:border-gray-600">
                        <h1>Porduct name</h1>
                        <p>Buyer: Buyer name</p>
                        <p>Date of sell</p>
                    </li>
                    <li class="w-full px-4 py-2 border-b border-black rounded-t-lg dark:border-gray-600">
                        <h1>Porduct name</h1>
                        <p>Buyer: Buyer name</p>
                        <p>Date of sell</p>
                    </li>
                    <li class="w-full px-4 py-2 border-b border-black rounded-t-lg dark:border-gray-600">
                        <h1>Porduct name</h1>
                        <p>Buyer: Buyer name</p>
                        <p>Date of sell</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SaleHistory