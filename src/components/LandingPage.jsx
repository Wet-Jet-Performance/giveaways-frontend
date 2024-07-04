import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WJPShield from "../assets/wjp-shield.png";

const LandingPage = () => {
    const [giveawaySteps, setGiveawaySteps] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [giveaways, setGiveaways] = useState([]);
    const [selectedGiveaway, setSelectedGiveaway] = useState('');
    const [message, setMessage] = useState('');
    const api = process.env.REACT_APP_BACKEND_API;

    useEffect(() => {
        axios.get(`${api}/giveawaysteps`)
            .then(response => {
                setGiveawaySteps(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the giveaway steps!', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${api}/giveaways`)
            .then(response => {
                setGiveaways(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the giveaways!', error);
            });
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Submit participant data
            const participantResponse = await axios.post(`${api}/participants`, {
                name,
                phone_number: phoneNumber,
                email
            });

            const participantId = participantResponse.data.id;

            // Step 2: Submit ticket data
            const ticketResponse = await axios.post(`${api}/tickets`, {
                giveaway_id: selectedGiveaway,
                participant_id: participantId,
                number_of_tickets: 5
            });

            const ticketIds = ticketResponse.data.ids;

            // Step 3: Send email
            const emailResponse = await axios.post(`${api}/tickets/email`, {
                giveaway_id: selectedGiveaway,
                participant_id: participantId,
                ticket_ids: ticketIds
            });

            setMessage("Tickets sent to the given mail successfully");
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }

        // closeModal();
    };

    return (
        <>
            <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
                <header className="text-center mb-12">
                    <div className="flex flex-row space-x-2 items-center justify-center">
                        <img className='h-32 hidden md:flex' src={WJPShield} alt='wet jet performance logo' />
                        <div className="flex flex-col justify-center items-center align-middle">
                            <h1 className="text-5xl font-extrabold mb-4">Wet Jet Performance Giveaway!</h1>
                            <p className="text-lg mb-6">
                                Enter for a chance to win amazing prizes! Don’t miss out on this exclusive opportunity.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={openModal}
                        className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 font-semibold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Enter Now
                    </button>
                </header>

                <section className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
                    <p className="text-lg mb-6">
                        Simply follow the steps below to enter our giveaway and increase your chances of winning!
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {giveawaySteps.map((step, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <div className="text-yellow-500 text-4xl mb-4">{step.step_number}</div>
                                <h3 className="text-xl font-semibold mb-2">{step.step_title}</h3>
                                <p>{step.step_description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="text-center mt-12">
                    <div className="rounded-lg shadow-lg">
                        <div className="text-4xl mb-4">Looking for more Wet Jet Performance?</div>
                        <h3 className="text-xl font-semibold mb-2">Check out <a className="text-yellow-500" href="http://wetjetperformance.com">wetjetperformance.com</a> </h3>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 md:max-w-lg max-w-sm mx-auto">
                        <h2 className="text-xl font-semibold mb-4">Enter Giveaway</h2>
                        {message && <p className="mb-4 text-green-500">{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="giveaway" className="block text-sm font-medium text-gray-700 mb-2">Giveaways</label>
                                <select
                                    id="giveaway"
                                    value={selectedGiveaway}
                                    onChange={(e) => setSelectedGiveaway(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="">Select a giveaway</option>
                                    {giveaways.map((giveaway) => (
                                        <option key={giveaway.id} value={giveaway.id}>{giveaway.name}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default LandingPage;
