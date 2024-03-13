import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
    <>
        <nav>
            <Header/>
        </nav>

        <main>
            Landing Page Content Here
        </main>

        <nav>
            <Footer/>
        </nav>
    </>
    );
};

export default LandingPage;