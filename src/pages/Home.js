import Footer from "../components/Footer";
import './Home.css'
import NavBar from "../components/NavBar";
import WJPShield from "../assets/wjp-shield.png";

const Home = () => {

  return (
    <div className='home-body'>
      <NavBar />
      <div id='landing-titles'>
        <img className='wjp-shield' src={WJPShield} alt='wet jet performance shield logo'/>
        <h1 className='site-title'>Wet Jet Performance</h1>
        <h2 className='site-title'>Giveaways</h2>
      </div>
      <div id='landing-more-wjp'>
        <p> Looking for more Wet Jet Performance?</p>
        <p> Check out <a href='https://wetjetperformance.com/' id='more-wjp-link' target='_blank' rel='noreferrer'> wetjetperformance.com </a></p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
