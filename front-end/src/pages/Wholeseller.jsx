import { Link } from "react-router-dom"

import Header from "../components/Header"
import BuyHistory from "../components/BuyHistory"
import SaleHistory from "../components/SaleHistory"

const WholeSeller = () => {
    return(
        <>
            <Header />
            <div className="flex flex-col md:flex-row md:space-x-8 my-10">
                <div className="flex-1">
                    <h1 className="text-lg font-bold">Buy History</h1>
                    <BuyHistory />
                </div>
                <div className="flex-1">
                    <Link to="/wholeseller/saleform">
                        <button className="text-black border border-black font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-purple-300 bg-purple-700">Add Entry</button>
                    </Link>
                    <h1 className="text-lg font-bold">Sale History</h1>
                    <SaleHistory />
                </div>
            </div>
        </>
    )
}

export default WholeSeller