import { Link } from "react-router-dom"

import Header from "../components/Header"
import BuyHistory from "../components/BuyHistory"
import SaleHistory from "../components/SaleHistory"

const Retailer = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row md:space-x-8 my-10">
                <div className="flex-1">
                    <h1 className="text-lg font-bold">Buy History</h1>
                    <BuyHistory />
                </div>
                <div className="flex-1">
                    <h1 className="text-lg font-bold">Sale History</h1>
                    <SaleHistory />
                </div>
            </div>
        </>
    )
}

export default Retailer