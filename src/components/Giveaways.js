import { useState, useRef } from 'react';
import './Giveaways.css';
import AreYouSure from './AreYouSure';
import trashCanIcon from '../assets/trash-can-white.png';

const Giveaways = ({giveaways, tickets, winnersList, is_admin, deleteGiveawayCallback, updateGiveawayCallback, selectedGiveaway, setSelectedGiveawayCallback, createWinnerCallback, deleteWinnerCallback }) => {
  const giveawayAreYouSureDialogRef = useRef(null);
  const dialogFormRef = useRef(null);
  const defaultGiveaway = {
    'id': '',
    'name': '',
    'start_date': '',
    'end_date': ''
  };

  const defaultAreYouSureData = {
    'itemType': '',
    'itemId': 0,
    'itemName': '',
    'deleteCallback': ''
  }

  const [updatedGiveawayData, setUpdatedGiveawayData] = useState(defaultGiveaway);
  const [areYouSureData, setAreYouSureData] = useState(defaultAreYouSureData);

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

  const deleteGiveaway = (event, confirmed=false) => {
    if (confirmed) { 
      dialogFormRef.current.close()
      deleteGiveawayCallback(updatedGiveawayData.id)
    } else {
      setAreYouSureData({
        'itemType': 'Giveaway',
        'itemId': updatedGiveawayData.id,
        'itemName': updatedGiveawayData.name,
        'deleteCallback': deleteGiveaway
      })
      giveawayAreYouSureDialogRef.current.showModal();
    }
  }

  const updateForm = (event) => {
    setUpdatedGiveawayData({...updatedGiveawayData,
      [event.target.name]: event.target.value })
  }

  const toggleSelectedGiveaway = (event, giveawayId) => {
    if (selectedGiveaway === giveawayId) {
      setSelectedGiveawayCallback('all');
    } else {
      setSelectedGiveawayCallback(giveawayId);
    }
  }

  const drawWinner = (e, giveawayId) => {
    e.stopPropagation();
    try {
      const selectedGiveawayTickets = tickets[giveawayId];
      const randomIndex = Math.floor(Math.random() * selectedGiveawayTickets.length);
      const winningTicket = selectedGiveawayTickets[randomIndex];
      createWinnerCallback(winningTicket.id, winningTicket.participant_id, winningTicket.giveaway_id, winningTicket.participant_name, winningTicket.participant_phone, winningTicket.participant_email);
    } catch {
      console.log('error: no tickets');
    }
  }

  const deleteWinner = (e, confirmed, winnerId, giveawayId, winnerName) => {
    e.stopPropagation();
    if (confirmed) {
      deleteWinnerCallback(winnerId, giveawayId);
      setSelectedGiveawayCallback('all');
    } else {
      setAreYouSureData({
        'itemType': 'Winner',
        'itemId': winnerId,
        'itemName': winnerName,
        'deleteCallback': deleteWinner,
        'callbackArgs': [winnerId, giveawayId, winnerName]
      })
      giveawayAreYouSureDialogRef.current.showModal();
    }
    
  }

  const giveawaysList = giveaways.map((giveaway) => {
    const editButton = is_admin ? 
      <button type="button" className='edit-giveaway-btn management-button' onClick={(e) => editGiveaway(e, giveaway)}>Edit</button> 
      : '';
    
    const drawWinnerButton = is_admin ? 
      <button className='management-button' type="button" onClick={(e) => drawWinner(e, giveaway.id)}>Draw Winner</button> 
      : '';
    const winners = giveaway.winners.map((winner) => {
      return (
        <div className='giveaway-winner' key={winner.id}>
          <p>Winning Ticket: #{winner.winning_ticket_id}</p>
          <div className='giveaway-winner-body'>
            <p>{winnersList[winner.id]['participant_name']}</p>
            <button className='delete-giveaway-winner-btn' type='button' onClick={(e) => deleteWinner(e, false, winner.id, giveaway.id, winnersList[winner.id]['participant_name'])}><img src={trashCanIcon} alt='delete' /></button>
          </div>
        </div>
      )
    });
    
    const activeClass = selectedGiveaway === giveaway.id ? 'active' : '';

    return (
      <div className={`giveaway-container ${activeClass}`} onClick={(event) => toggleSelectedGiveaway(event, giveaway.id)} key={giveaway.id}>
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
        itemType={areYouSureData.itemType}
        itemId={areYouSureData.itemId}
        itemName={areYouSureData.itemName}
        deleteItemCallback={areYouSureData.deleteCallback}
        callbackArgs={areYouSureData.callbackArgs}
      />
    </div>
    
  );
};

export default Giveaways;
