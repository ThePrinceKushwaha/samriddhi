import React from "react";
import { format } from 'date-fns';
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';



import Header from "./Header";

const SaleForm = () => {

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MM/dd/yyyy');

    const location = useLocation();
    const userInfo = location.state?.userInfo;

    const [productId, setProductId] = useState()

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        expiry_date: ''
    })

    const [transactionData, setTransactionData] = useState({
        buyer: '',
        price: '',
    })


    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });

    }

    const handleTransactionChange = (e) => {
        const { name, value } = e.target;
        setTransactionData({
            ...transactionData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(transactionData)
        console.log(productData)

        try {
            const token = Cookies.get('jwt');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('http://localhost:8000/api/v1/products/create-product/', productData, config)
            console.log("response: ", response)
            console.log("product id: ", response.data.id)
            const productId = response.data.id;
            setProductId(productId);

        } catch (error) {
            console.log("error: " + error)
        }

        const updatedTransactionData = {
            ...transactionData,
            product: productId
        };

        try {
            const token = Cookies.get('jwt');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('http://localhost:8000/api/v1/products/create-transaction/', updatedTransactionData, config)
            console.log("response: ", response)
        } catch (error) {
            console.log("error: " + error)
        }
    }

    return (
        <>
            <Header props={userInfo} />
            <div className="p-20">
                <form className="w-full max-w-lg m-auto" onSubmit={handleSubmit}>
                    <h1 className="text-lg font-bold my-5">Buyer Details</h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-password">
                                Shop Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                // name="buyer"
                                // value={transactionData.buyername}
                                onChange={handleTransactionChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-first-name">
                                Buyer Id:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="number"
                                name="buyer"
                                value={transactionData.buyer}
                                onChange={handleTransactionChange}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-first-name">
                                PAN No:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                // name="panNumber"
                                // value={transactionData.panNumber}
                                onChange={handleTransactionChange}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Vat No:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                // name="vatNumber"
                                // value={transactionData.vatNumber}
                                onChange={handleTransactionChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-city">
                                City
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                // name="address"
                                // value={transactionData.address}
                                onChange={handleTransactionChange}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-state">
                                State
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option>Koshi Pradesh</option>
                                    <option>Madesh Pradesh</option>
                                    <option>Bagmati Pradesh</option>
                                    <option>Gandaki Pradesh</option>
                                    <option>Lumbini Pradesh</option>
                                    <option>Karnali Pradesh</option>
                                    <option>Sudurpaschim Pradesh</option>
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-lg font-bold my-5">Product Details</h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-password">
                                Product Name:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleProductChange}
                                required
                            />
                        </div>
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-password">
                                Product Description:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                name="description"
                                value={productData.description}
                                onChange={handleProductChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-quantity">
                                Quantity
                            </label>
                            <div className="flex">
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded-l py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-quantity"
                                    type="text"
                                    name="quantity"
                                    value={transactionData.quantity}
                                    onChange={handleTransactionChange}
                                    required
                                    placeholder="Enter quantity"
                                />
                                <select
                                    className="block w-24 bg-gray-200 border border-l-0 border-gray-500 rounded-r py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-unit"
                                    name="metric"
                                    value={transactionData.metric}
                                    onChange={handleTransactionChange}
                                    required
                                >
                                    <option value="kg">KG</option>
                                    <option value="ton">Tons</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-last-name">
                                Rate (per unit)
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                name="price"
                                value={transactionData.price}
                                onChange={handleTransactionChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-city">
                                Expiry Date:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="date"
                                name="expiry_date"
                                value={productData.expiry_date}
                                onChange={handleProductChange}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-city">
                                Sell Date:
                            </label>
                            <p
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                rows="1" readOnly>
                                {formattedDate}
                            </p>
                        </div>
                    </div>
                    <button className="btn bg-green text-black py-2 px-4 rounded my-5">
                        Add Entry
                    </button>
                </form>
            </div>
        </>
    )
}

export default SaleForm;
