import React, { useState, useEffect } from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const PaymentPortal= () => {
    const [invoices, setInvoices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        amount: "",
        email: "",
        cardNumber: "",
        expiration: "",
        cvc: "",
        country: "",
        zipcode: ""
    });
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await fetch('http://localhost:5000/api/patient/invoices', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); 
                    setInvoices(data); 
                } else {
                    console.error('Failed to fetch invoices:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, []); 

    const handlePayNow = (invoiceId) => {
        setSelectedInvoiceId(invoiceId);
        console.log(invoiceId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setFormData({
            amount: "",
            email: "",
            cardNumber: "",
            expiration: "",
            cvc: "",
            country: "",
            zipcode: ""
        });
        setIsModalOpen(false);
        setErrorMessage("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); 
            const selectedInvoice = invoices.find(invoice => invoice.invoiceID === selectedInvoiceId);
            
            if (!selectedInvoice) {
                console.error('Invoice not found.');
                return;
            }
    
            const remainingAmount = selectedInvoice.Net_Amount - selectedInvoice.Paid_Amount;
            
            if (parseFloat(formData.amount) > remainingAmount) {
                setErrorMessage("Payment amount exceeds remaining amount.");
                return; 
            }
    
            const response = await fetch('http://localhost:5000/api/patient/pay-invoice', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    invoiceID: selectedInvoiceId,
                    paymentAmount: parseFloat(formData.amount)
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setIsModalOpen(false);
                fetchInvoices();
            } else {
                console.error('Failed to pay invoice:', response.statusText);
            }
        } catch (error) {
            console.error('Error paying invoice:', error);
        }
    };        

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <HeaderPortalPatient />
                </nav>
    
                <div className="flex flex-1">
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="/patient/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                                <li><a href="/patient/appointment" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/patient/payment" className="block py-2 text-center font-bold underline">Billing & Payments</a></li>
                                <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                                <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
                                <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                            </ul>
                        </nav>
                    </aside>
    
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold p-8 ml-8">Billing & Payments</h1>
    
                        <div className="ml-16">
                            <h1 className="font-bold pb-4">Note:</h1>
                            <p className="mb-4">
                                Or if you prefer, for information about your balance or to pay on your bill,
                                you can reach our Customer Support from 8am-5pm CST by calling 123-456-7890.
                                The Customer Support Team will be happy to answer your questions, set up a payment plan or
                                take your payment over the phone using a credit card.
                            </p>
                            <p className="mb-8">
                                Please find below details on your current payments and billing history.
                            </p>
                        </div>
    
                        <div className="ml-16">
                            <h1 className="text-xl font-bold pt-16 py-4">Payments</h1>
    
                            <table className="border-collapse border border-gray-400">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 px-5 py-2">Date Created</th>
                                        <th className="border border-gray-400 px-5 py-2">Appointment Type</th>
                                        <th className="border border-gray-400 px-5 py-2">Policy Number</th>
                                        <th className="border border-gray-400 px-5 py-2">Gross Amount</th>
                                        <th className="border border-gray-400 px-5 py-2">Insurance Coverage</th>
                                        <th className="border border-gray-400 px-5 py-2">Net Amount</th>
                                        <th className="border border-gray-400 px-5 py-2">Paid Amount</th>
                                        <th className="border border-gray-400 px-5 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map(invoice => (
                                        <tr key={invoice.id}>
                                            <td className="border border-gray-400 px-5 py-4">{formatDate(invoice.Date)}</td>
                                            <td className="border border-gray-400 px-5 py-4">
                                            {invoice.Appointment_type}
                                            {invoice.cleaning_discount_applied === 1 && (
                                                <div className="text-sm">
                                                    You were discounted 20% for your first cleaning appointment with us.
                                                </div>
                                            )}
                                            </td>

                                            <td className="border border-gray-400 px-5 py-4">{invoice.Policy_number}</td>
                                            <td className="border border-gray-400 px-5 py-4">{invoice.Gross_Amount}</td>
                                            <td className="border border-gray-400 px-5 py-4">{invoice.Insurance_coverage}</td>
                                            <td className="border border-gray-400 px-5 py-4">{invoice.Net_Amount}</td>
                                            <td className="border border-gray-400 px-5 py-4">{invoice.Paid_Amount}</td>
                                            <td className="border border-gray-400 px-5 py-4">
                                                <button 
                                                    onClick={() => handlePayNow(invoice.invoiceID)} 
                                                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                                                >
                                                    Pay Now
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
    
                        </div>
    
                        <h1 className="text-xl font-bold pt-16 py-4 ml-16">Questions?</h1>
                        <p className="ml-16 mb-8"> Call your practice at 123-456-7890 or email at shasta@shastadental.com.</p>
    
                    </main>
    
                </div>
    
                <nav>
                    <Footer />
                </nav>
    
            </div>
            {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <input type="text" name="amount" value={formData.amount} onChange={handleInputChange} placeholder="Amount" className="mb-2" />
                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="mb-2" />
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="Card Number" className="mb-2" />
                        <div className="flex mb-2">
                            <input type="text" name="expiration" value={formData.expiration} onChange={handleInputChange} placeholder="Expiration" className="flex-1 mr-2" />
                            <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="CVC" className="flex-1 ml-2" />
                        </div>
                        <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" className="mb-2" />
                        <input type="text" name="zipcode" value={formData.zipcode} onChange={handleInputChange} placeholder="Zipcode" className="mb-2" />
                        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                        <div className="flex">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                            <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-2">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    );    
};

export default PaymentPortal;