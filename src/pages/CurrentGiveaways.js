import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './CurrentGiveaways.css';

const CurrentGiveaways = ({giveaways, winnersList}) => {
  const filteredGiveaways = giveaways.filter((giveaway) => {
    const formattedStartDate = new Date(giveaway.start_date);
    const formattedEndDate = new Date(giveaway.end_date);
    const today = new Date();

    return today >= formattedStartDate && today <= formattedEndDate
  })

  const giveawaysList = filteredGiveaways.map((giveaway) => {

    const photos = giveaway.photos.map((photo, index) => {
      return <img key={index} src={`data:image/${photo[1]};base64,${photo[0]}`} alt='giveaway item'/>
    })
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
        <div className='giveaway-photos-section'>
          {photos}
        </div>
        <div className='giveaway-winners-section'>
          {winners}
        </div>
      </div>
    )
  })

  return (
    <div>
      <NavBar />
      <main className='giveaways-body'>
        <h3 id='current-giveaways-header'>Current Giveaways</h3>
        {giveawaysList.reverse()}
      </main>
      <Footer />
    </div>
  );
};

export default CurrentGiveaways;