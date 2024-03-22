import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import preventativeImage from './images/preventative.png';
import restorativeImage from './images/restorative.png';
import cosmeticImage from './images/cosmetic.png';

const Card = (props) => {
    return (
        <div className="flex flex-col items-center mx-4 transform transition-transform duration-300 hover:scale-110">
            <div style={{'box-shadow': '0 0 15px rgba(0,0,0,0.4)'}} className="flex flex-1 flex-col items-center bg-white p-4 my-12 w-full md:max-w-80">
                <img className="object-scale-down h-48 w-96" src={props.image}/>
                <div className="text-center text-xl font-bold text-blue-900">{props.title}</div>
                <div className="py-6">{props.description}</div>
            </div>
        </div>
    )
}

const AboutPage = () => {
    return (
        <>
        <div className="flex flex-col min-h-screen bg-[#d0d3da]">
            <Header />
            <div className="mx-auto px-4 mt-20 mb-10">
                <div className="flex flex-col justify-center items-center" >
                    <div className=" py-8 max-w-5xl border-2 border-black rounded-xl px-10 mt-5">
                        <p className="text-center text-3xl font-bold pb-8 text-blue-900">WELCOME TO SHASTADENTAL!</p>
                        <p className="text-center text-2xl pb-2">At ShastaDental, our mission is to elevate the standard of dental care by offering unparalleled service in a friendly and inviting atmosphere. Our dedicated team of professionals combines expertise with the latest advancements in technology to ensure every visit exceeds your expectations. Whether you're in for a routine check-up, exploring cosmetic improvements, or in need of specialized treatments, rest assured, ShastaDental is committed to addressing all your dental needs. Your oral health and satisfaction remain our foremost priorities, and we eagerly anticipate the opportunity to serve you with unmatched excellence.</p>
                    </div>
                    <h2 className="mt-10 text-center text-3xl font-bold text-blue-900">SERVICES WE PROVIDE</h2>
                    <div className="bg-inherit flex justify-center items-center">
                        <div className="flex flex-wrap ">
                            <Card image={preventativeImage} title="PREVENTATIVE" description="At our dental clinic, we prioritize your oral health through comprehensive preventative services. Our dedicated team focuses on proactive measures to maintain your smile's vitality, including regular cleanings, fluoride treatments and sealants" />
                            <Card image={restorativeImage} title="RESTORATIVE" description="Our restorative services are here to restore both function and aesthetics to your smile. From minor repairs like fillings and crowns to more extensive treatments such as root canals and dental implants, our skilled professionals utilize the latest techniques and materials to rebuild your teeth's strength and appearance." />
                            <Card image={cosmeticImage} title="COSMETIC" description="Enhance your smile with our range of cosmetic services, including professional whitening, invisible braces, and porcelain veneers. Our expert dentists will customize a plan to meet your goals." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default AboutPage;
