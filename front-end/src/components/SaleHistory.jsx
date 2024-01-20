import React from "react";
import { Link } from "react-router-dom";

const sales = [
    {
        productName: "Siraha Sugar",
        quantity: "10 tons",
        ratePerUnit: "10",
        buyerName: "Kathmandu Wholesale",
        date: "03/11/2023"
    },
    {
        productName: "Sunsari Rice",
        quantity: "10 tons",
        ratePerUnit: "10",
        buyerName: "Hetauda Wholesale",
        date: "03/11/2023"
    },
    {
        productName: "Ilam Tea",
        quantity: "10 tons",
        ratePerUnit: "10",
        buyerName: "Dhangadhi Wholesale",
        date: "03/11/2023"
    },
    {
        productName: "Jumla Apple",
        quantity: "10 tons",
        ratePerUnit: "10",
        buyerName: "Kathmandu Wholesale",
        date: "03/11/2023"
    }
]

const SaleHistory = () => {
    return (
        <>
            <div className="w-full my-10">
                <ul className="text-sm font-medium text-gray-900 bg-gray-light rounded-lg">
                    {sales.map((sales,index) => (
                        <li className="w-full px-4 py-2 border-b border-white rounded-t-lg dark:border-gray-600">
                            <h1>{sales.productName}</h1>
                            <p>{sales.quantity}</p>
                            <p>{sales.ratePerUnit}</p>
                            <p>{sales.buyerName}</p>
                            <p>{sales.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SaleHistory