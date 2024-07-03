import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Footer = ({ admin_page_active }) => {
  const { loginWithRedirect } = useAuth0();

  const admin_button_class = admin_page_active
    ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
    : 'bg-gray-800 text-white hover:bg-gray-700';

  const loginRedirect = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/admin",
      },
    });
  };

  return (
    <footer className="bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-between items-center">
      <button
        className={`py-2 px-4 rounded-lg transition duration-300 ${admin_button_class}`}
        onClick={loginRedirect}
      >
        ADMIN
      </button>
      <div className="text-center mt-4 md:mt-0">&copy; 2024 Wet Jet Performance</div>
    </footer>
  );
};

export default Footer;
