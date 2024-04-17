import { NavLink } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <NavLink to='/admin'>ADMIN</NavLink>
      <div className="copyright">&copy; Wet Jet Performance</div>
    </footer>
  );
};

export default Footer;
