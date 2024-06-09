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

    const photos = giveaway.photos.map((photo) => {
      return (
        <img key={photo.id} src={`https://imagedelivery.net/E868QW-m3V6nzVTKXKDrtg/${photo.cloudflare_id}/public`} alt='' />
      )
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
        <h1 id='current-giveaways-header'>Current Giveaways</h1>
        {giveawaysList.reverse()}
      </main>
      <Footer />
    </div>
  );
};

export default CurrentGiveaways;