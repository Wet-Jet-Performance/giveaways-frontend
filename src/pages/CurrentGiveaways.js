import Giveaways from '../components/Giveaways';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './CurrentGiveaways.css';

const CurrentGiveaways = ({giveaways}) => {

  return (
    <div>
      <NavBar />
      <div className='giveaways-body'>
        <h3 id='current-giveaways-header'>Current Giveaways</h3>
        <Giveaways giveaways={giveaways} />
      </div>
      <Footer />
    </div>
  );
};

export default CurrentGiveaways;