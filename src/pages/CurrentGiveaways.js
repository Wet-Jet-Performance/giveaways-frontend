import Giveaways from '../components/Giveaways';
import NavBar from '../components/NavBar';
import './CurrentGiveaways.css'

const CurrentGiveaways = ({giveaways}) => {

  return (
    <div className='giveaways-body'>
      <NavBar />
      <h3 id='current-giveaways-header'>Current Giveaways</h3>
      <Giveaways giveaways={giveaways} />
    </div>
  );
};

export default CurrentGiveaways;