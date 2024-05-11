import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './CurrentGiveaways.css';

const CurrentGiveaways = ({giveaways, winnersList}) => {

  const giveawaysList = giveaways.map((giveaway) => {
    const winners = giveaway.winners.map((winner) => {
      return (
        <div className='giveaway-winner' key={winner.id}>
          <p>Winning Ticket: #{winner.winning_ticket_id}</p>
          <div className='giveaway-winner-body'>
            <p>{winnersList[winner.id]['participant_name']}</p>
          </div>
        </div>
      )
    });

    return (
      <div className='giveaway-container' key={giveaway.id}>
        <h4 className="giveaway-title"> {giveaway.name} </h4>
        <p className="giveaway-dates"> {giveaway.start_date} - {giveaway.end_date} </p>
        <div className='giveaway-winners-section'>
          {winners}
        </div>
      </div>
    )
  })

  return (
    <div>
      <NavBar />
      <div className='giveaways-body'>
        <h3 id='current-giveaways-header'>Current Giveaways</h3>
        {giveawaysList}
      </div>
      <Footer />
    </div>
  );
};

export default CurrentGiveaways;