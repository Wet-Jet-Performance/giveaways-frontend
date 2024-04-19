import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import "./Footer.css";

const Footer = ({admin_page_active}) => {
  const {loginWithRedirect, isAuthenticated} = useAuth0();
  
  const admin_button_class = admin_page_active ? 'active' : '';

  const loginRedirect = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/admin"
      }
    });
  };

  return (
    <footer>
      <a className={admin_button_class} onClick={loginRedirect}>
          ADMIN
      </a>
      <div className="copyright">&copy; Wet Jet Performance</div>
    </footer>
  );
};

export default Footer;
