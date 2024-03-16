import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import preventativeImage from './images/preventative.png';
import restorativeImage from './images/restorative.png';
import cosmeticImage from './images/cosmetic.png';

const Card = (props) => {
    return (
        <div className="flex flex-col items-center mx-4">
            <div style={{'box-shadow': '0 0 15px rgba(0,0,0,0.4)'}} className="flex flex-1 flex-col items-center bg-white p-4 my-10 w-full md:max-w-80">
                <img className="object-scale-down h-48 w-96" src={props.image} />
                <div className="text-center text-xl font-bold">{props.title}</div>
                <div className="py-6">{props.description}</div>
            </div>
        </div>
    )
}

const ServicesPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#d0d3da]">
            <Header />
            <div className="bg-inherit flex-grow container mx-auto px-4 flex justify-center items-center mt-10 mb-10">
                <div class="flex flex-wrap">
                    <Card image={preventativeImage} title="PREVENTATIVE" description="At our dental clinic, we prioritize your oral health through comprehensive preventative services. Our dedicated team focuses on proactive measures to maintain your smile's vitality, including regular cleanings, fluoride treatments and sealants" />
                    <Card image={restorativeImage} title="RESTORATIVE" description="Our restorative services are here to restore both function and aesthetics to your smile. From minor repairs like fillings and crowns to more extensive treatments such as root canals and dental implants, our skilled professionals utilize the latest techniques and materials to rebuild your teeth's strength and appearance." />
                    <Card image={cosmeticImage} title="COSMETIC" description="Enhance your smile with our range of cosmetic services, including professional whitening, invisible braces, and porcelain veneers. Our expert dentists will customize a plan to meet your goals." />
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ServicesPage;
