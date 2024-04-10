import { NavLink } from "react-router-dom";
import './Home.css'

const Home = () => {

  return (
    <div className='home-body'>
      <div className='black-background' />
      <div id='landing-titles'>
        <h1 className='site-title'>Wet Jet Performance</h1>
        <h2 className='site-title'>Giveaways</h2>
      </div>
      <div id='landing-links'>
        <NavLink id='current-giveaways-link' to="/giveaways">Current Giveaways</NavLink>
        <p id='more-wjp-link'>More Wet Jet Performance</p>
      </div>
    </div>
  );
};

export default Home;
