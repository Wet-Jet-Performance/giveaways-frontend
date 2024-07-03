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
        <div key={photo.id} className='photo-square'>
          <img className='giveaway-photo' src={`https://imagedelivery.net/E868QW-m3V6nzVTKXKDrtg/${photo.cloudflare_id}/public`} alt='' />
        </div>
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
      <div className='giveaway-container bg-gray-900' key={giveaway.id}>
        <header>
          <h4 className="giveaway-title"> {giveaway.name} </h4>
          <p className="giveaway-dates"> {giveaway.start_date} - {giveaway.end_date} </p>
        </header>
        <p className="giveaway-description"> {giveaway.description} </p>
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
    <div className='bg-gray-900 text-white'>
      <NavBar />
      <main className='giveaways-body '>
        <h1 id='current-giveaways-header' className='text-3xl'>Current Giveaways</h1>
        {giveawaysList.reverse()}
      </main>
      <Footer admin_page_active={true} />
    </div>
  );
};

export default CurrentGiveaways;