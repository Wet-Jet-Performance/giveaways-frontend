import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useState } from 'react';
import WJPLogo from '../assets/wjp.png'

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksClass = showLinks ? 'show-links' : 'hide-links';

  return (
    <nav className={linksClass}>
      <div id='hamburger-icon' onClick={() => setShowLinks(!showLinks)}>
        <div id='hamburger-bar1'></div>
        <div id='hamburger-bar2'></div>
        <div id='hamburger-bar3'></div>
      </div>
      <div className='nav-links'>
        <NavLink to='/'>HOME</NavLink>
        <NavLink to='/giveaways'>GIVEAWAYS</NavLink>
      </div>
      <div className='nav-title'>
        <img className='wjp-logo' src={WJPLogo} alt='wet jet performance logo' />
        <p id='giveaway-title'> GIVEAWAYS </p>
      </div>
    </nav>
  );
};

export default NavBar;