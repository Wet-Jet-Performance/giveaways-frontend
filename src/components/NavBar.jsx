import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import WJPLogo from '../assets/wjp.png';
import WJPShield from '../assets/wjp-shield.png';

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={WJPShield} alt="wet jet performance logo" className="h-10 w-10 mr-2" />
        <p className="text-2xl font-semibold">GIVEAWAYS</p>
      </div>
      <div className="hidden md:flex space-x-6">
        <NavLink to="/" className="hover:text-yellow-500 transition duration-300">HOME</NavLink>
        <NavLink to="/giveaways" className="hover:text-yellow-500 transition duration-300">GIVEAWAYS</NavLink>
      </div>
      <div className="md:hidden" onClick={() => setShowLinks(!showLinks)}>
        <div className="h-1 w-6 bg-white my-1"></div>
        <div className="h-1 w-6 bg-white my-1"></div>
        <div className="h-1 w-6 bg-white my-1"></div>
      </div>
      {showLinks && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center py-4 md:hidden">
          <NavLink to="/" className="py-2" onClick={() => setShowLinks(false)}>HOME</NavLink>
          <NavLink to="/giveaways" className="py-2" onClick={() => setShowLinks(false)}>GIVEAWAYS</NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
