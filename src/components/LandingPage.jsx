import WJPShield from "../assets/wjp-shield.png";

const LandingPage = () => {
    return (
        <>
            {/* Landing Page */}
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
                    <a href="/giveaways" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 font-semibold py-3 px-6 rounded-lg transition duration-300">
                        Enter Now
                    </a>
                </header>

                <section className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
                    <p className="text-lg mb-6">
                        Simply follow the steps below to enter our giveaway and increase your chances of winning!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <div className="text-yellow-500 text-4xl mb-4">1</div>
                            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                            <p>Follow us on social media to stay updated on the giveaway and future events.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <div className="text-yellow-500 text-4xl mb-4">2</div>
                            <h3 className="text-xl font-semibold mb-2">Register yourself</h3>
                            <p>Register for giveaways and we will send your confimation tickets to your mail.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <div className="text-yellow-500 text-4xl mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-2">Win Prizes</h3>
                            <p>We’ll randomly select winners and sent them mails for winning and prices.</p>
                        </div>
                    </div>
                </section>

                <div className="text-center mt-12">
                    <div className="rounded-lg shadow-lg">
                        <div className="text-4xl mb-4">Looking for more Wet Jet Performance?</div>
                        <h3 className="text-xl font-semibold mb-2">Check out <a className="text-yellow-500" href="http://wetjetperformance.com">wetjetperformance.com</a> </h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage