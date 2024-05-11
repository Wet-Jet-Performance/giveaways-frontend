import { useState, useRef } from 'react';
import './Giveaways.css';
import AreYouSure from './AreYouSure';

const Giveaways = ({giveaways, tickets, winnersList, is_admin, deleteGiveawayCallback, updateGiveawayCallback, selectedGiveaway, setSelectedGiveawayCallback, createWinnerCallback, deleteWinnerCallback }) => {
  const giveawayAreYouSureDialogRef = useRef(null);
  const dialogFormRef = useRef(null);
  const defaultGiveaway = {
    'id': '',
    'name': '',
    'start_date': '',
    'end_date': ''
  };

  const [updatedGiveawayData, setUpdatedGiveawayData] = useState(defaultGiveaway);

  const editGiveaway = (e, giveaway) => {
    e.stopPropagation();

    const formattedStartDate = new Date(giveaway.start_date).toISOString().substring(0, 10);
    const formattedEndDate = new Date(giveaway.end_date).toISOString().substring(0, 10);
    
    setUpdatedGiveawayData({
      id: giveaway.id,
      name: giveaway.name,
      start_date: formattedStartDate,
      end_date: formattedEndDate
    })

    dialogFormRef.current.showModal();
    
  }

  const deleteGiveaway = (event=null, confirmed=false) => {
    if (confirmed) { 
      dialogFormRef.current.close()
      deleteGiveawayCallback(updatedGiveawayData.id)
    } else {
      giveawayAreYouSureDialogRef.current.showModal();
    }
  }

  const updateForm = (event) => {
    setUpdatedGiveawayData({...updatedGiveawayData,
      [event.target.name]: event.target.value })
  }

  const toggleSelectedGiveaway = (event, giveawayName) => {
    if (selectedGiveaway === giveawayName) {
      setSelectedGiveawayCallback('all');
    } else {
      setSelectedGiveawayCallback(giveawayName);
    }
  }

  const drawWinner = (e, giveawayName) => {
    e.stopPropagation();
    try {
      const selectedGiveawayTickets = tickets[giveawayName];
      const randomIndex = Math.floor(Math.random() * selectedGiveawayTickets.length);
      const winningTicket = selectedGiveawayTickets[randomIndex];
      createWinnerCallback(winningTicket.id, winningTicket.participant_id, winningTicket.giveaway_id, winningTicket.participant_name, winningTicket.participant_phone, winningTicket.participant_email);
      console.log(winningTicket);
    } catch {
      console.log('error: no tickets');
    }
  }

  const deleteWinner = (e, winnerId, giveawayId) => {
    e.stopPropagation();
    deleteWinnerCallback(winnerId, giveawayId);
  }

  const giveawaysList = giveaways.map((giveaway) => {
    const editButton = is_admin ? 
      <button type="button" className='edit-giveaway-btn' onClick={(e) => editGiveaway(e, giveaway)}>Edit</button> 
      : '';
    
    const drawWinnerButton = is_admin ? 
      <button type="button" onClick={(e) => drawWinner(e, giveaway.name)}>Draw Winner</button> 
      : '';
    const winners = giveaway.winners.map((winner) => {
      return (
        <div className='giveaway-winner' key={winner.id}>
          <p>Winning Ticket: #{winner.winning_ticket_id}</p>
          <div className='giveaway-winner-body'>
            <p>{winnersList[winner.id]['participant_name']}</p>
            <button className='delete-giveaway-winner-btn' type='button' onClick={(e) => deleteWinner(e, winner.id, giveaway.id)}>Delete</button>
          </div>
        </div>
      )
    });
    
    const activeClass = selectedGiveaway === giveaway.name ? 'active' : '';

    return (
      <div className={`giveaway-container ${activeClass}`} onClick={(event) => toggleSelectedGiveaway(event, giveaway.name)} key={giveaway.id}>
        <h4 className="giveaway-title"> {giveaway.name} </h4>
        <p className="giveaway-dates"> {giveaway.start_date} - {giveaway.end_date} </p>
        <div className='giveaway-winners-section'>
          {winners}
        </div>
        {editButton}
        {drawWinnerButton}
      </div>
    )
  })

  return (
    <div>
      {giveawaysList}
      <dialog ref={dialogFormRef}>
        <button className='close-dialog' type='button' onClick={() => dialogFormRef.current.close()}>x</button>
        <header>Edit Giveaway</header>
        <form method='dialog' onSubmit={() => updateGiveawayCallback(updatedGiveawayData)}>
          <label htmlFor='name'> Name </label>
          <input name='name' value={updatedGiveawayData.name} onChange={updateForm}/>
          <label htmlFor='start_date'> Start Date </label>
          <input type='date' name='start_date' value={updatedGiveawayData.start_date} onChange={updateForm}/>
          <label htmlFor='end_date'> End Date </label>
          <input type='date' name='end_date' value={updatedGiveawayData.end_date} onChange={updateForm}/>
          <div className='dialog-buttons'>
            <button className='dialog-button' type='submit'>Save</button>
            <button className='dialog-button' type='button' id='delete-giveaway-btn' onClick={deleteGiveaway}>Delete Giveaway</button>
          </div>
        </form>
      </dialog>
      <AreYouSure
        areYouSureDialogRef={giveawayAreYouSureDialogRef}
        itemType={'Giveaway'}
        itemId={updatedGiveawayData.id}
        itemName={updatedGiveawayData.name}
        deleteItemCallback={deleteGiveaway}
      />
    </div>
    
  );
};

export default Giveaways;
