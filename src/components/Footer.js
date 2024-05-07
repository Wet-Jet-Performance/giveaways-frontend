import { useAuth0 } from '@auth0/auth0-react';
import "./Footer.css";

const Footer = ({admin_page_active}) => {
  const {loginWithRedirect} = useAuth0();
  
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
      <button className={admin_button_class} onClick={loginRedirect}>
          ADMIN
      </button>
      <div className="copyright">&copy; Wet Jet Performance</div>
    </footer>
  );
};

export default Footer;
