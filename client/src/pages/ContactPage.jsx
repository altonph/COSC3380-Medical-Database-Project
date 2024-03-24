import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import clinic1 from './images/austin.png';
import clinic2 from './images/phoenix.png';

const Card = (props) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-1 flex-col md:flex-row items-center bg-white p-2 my-12 md:max-w-xl relative">
                <div className="md:w-1/2 h-full">
                    <img className="object-cover h-full w-full" src={props.image} />
                </div>
                <div className="md:w-1/2 md:ml-6 text-center md:text-left">
                    <div className="text-xl font-bold text-blue-900 mb-2">{props.title}</div>
                    <div className="text-lg font-medium">{props.address}</div>
                    <div className="text-lg font-medium mb-4">{props.city_state}</div>
                    <div className="text-lg font-normal mb-4">{props.phone}</div>
                    <div className="text-lg text-left">
                        <h3>Hours of Operation:</h3>
                        <ul>
                            <li>Monday: 9:00 AM - 5:00 PM</li>
                            <li>Tuesday: 9:00 AM - 5:00 PM</li>
                            <li>Wednesday: 9:00 AM - 5:00 PM</li>
                            <li>Thursday: 9:00 AM - 5:00 PM</li>
                            <li>Friday: 9:00 AM - 5:00 PM</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ContactPage = () => {
    const clinicData = [
        {
            image: clinic1,
            title: "AUSTIN, TEXAS",
            address: "5432 Magnolia Drive",
            city_state: "Austin, TX 78710",
            phone: "(123) 456-7890",
        },
        {
            image: clinic2,
            title: "PHOENIX, ARIZONA",
            address: "9876 Sunflower Boulevard",
            city_state: "Phoenix, AZ 85001",
            phone:"(123) 456-7890",
        }
    ];

    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#d0d3da] justify-center">
                <Header />
                <div className="mx-auto px-4 mt-20">
                    <div className="flex flex-col justify-center items-center" >
                        <h2 className="mt-10 text-center text-3xl font-bold text-blue-900">OUR LOCATIONS</h2>
                        <div className="bg-inherit flex justify-center items-center">
                            <div className="flex flex-wrap ">
                                {clinicData.map((clinic, index) => (
                                    <Card key={index} image={clinic.image} title={clinic.title} address={clinic.address} city_state={clinic.city_state} phone={clinic.phone}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactPage;
