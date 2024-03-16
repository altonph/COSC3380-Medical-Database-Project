import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
    <>
        <nav><Header/></nav>

        <main>
            <div>
                <div className='relative h-screen bg-cover bg-right bg-center bg-top flex' style={{ backgroundImage: `url("../src/pages/images/landing.jpg")` }}>
                    <div className="company-phrase px-14 py-60" style={{ marginTop: "60px" }}>
                        <p className="text-5xl">SCULPTING <span className="font-bold">CONFIDENCE</span></p>
                        <p className="text-6xl">ONE <span className="font-bold">SMILE</span> AT A TIME</p>
                    </div>
                </div>
            </div>
        </main>

        <nav><Footer/></nav>
    </>
    );
};
export default LandingPage;