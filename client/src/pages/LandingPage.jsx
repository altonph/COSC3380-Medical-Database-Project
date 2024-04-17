import React, { useState } from "react";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
        <>
            <nav><Header/></nav>
            <main>
                <div>
                    <div className='relative h-screen bg-cover bg-right bg-center bg-top flex' style={{ backgroundImage: `url("../src/pages/images/landing.jpg")` }}>
                        <div className="company-phrase px-28 py-60 flex flex-col items-center justify-center" style={{ marginTop: "60px" }}>
                            <p className="text-6xl">SCULPTING <span className="font-bold text-blue-900">CONFIDENCE</span></p>
                            <p className="text-7xl">ONE <span className="font-bold text-blue-900">SMILE</span> AT A TIME</p>
                            <div className="mt-5 flex items-center justify-center">
                                <Link to="/patient/login">
                                    <button className="active:bg-blue-800 text-blue-900 hover:text-white border border-black hover:bg-blue-900 font-medium rounded-lg text-lg px-8 py-2 text-center dark:border-black dark:text-blue-900 dark:hover:text-white dark:hover:bg-blue-900 dark:focus:ring-blue-800 bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">REQUEST APPOINTMENT</button>
                                </Link>
                                <p className="ml-4 text-black text-2xl ">OR CALL (123)-456-7890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <nav><Footer/></nav>
        </>
    );
};
export default LandingPage;