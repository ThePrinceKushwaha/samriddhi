import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => {
  return (  
        <>
            <div className="container flex bg-purple text-white p-3 items-center">
                <div className="logoContainer">
                    <h2>Samriddhi</h2>  
                </div>
                <div className="navBar">
                            <ul className="Menu p-3">
                                    <Link to="/">Home</Link>
                                    <Link to="/contact">Contact</Link>
                                    <Link to="/about"> About</Link>
                            </ul>
                        </div>
            </div>

        </>
  )
}

export default Navigation
