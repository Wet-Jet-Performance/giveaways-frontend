import { useState, useRef } from 'react';
import './ManageGiveaways.css';
import AreYouSure from './AreYouSure';
import NewPhotoForm from './NewPhotoForm';
import EditGiveawayForm from './EditGiveawayForm';
import trashCanIcon from '../assets/trash-can-white.png';

const ManageGiveaways = ({giveaways, tickets, winnersList, deleteGiveawayCallback, updateGiveawayCallback, selectedGiveaway, setSelectedGiveawayCallback, createWinnerCallback, deleteWinnerCallback, createPhotoCallback, deletePhotoCallback }) => {
  const giveawayAreYouSureDialogRef = useRef(null);
  const editGiveawayFormRef = useRef(null);
  const addPhotoFormRef = useRef(null);
  
  const defaultGiveaway = {
    'id': '',
    'name': '',
    'description': '',
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

    // convert from Month Day, Year to YYYY-MM-DD
    const formattedStartDate = new Date(giveaway.start_date).toISOString().substring(0, 10);
    const formattedEndDate = new Date(giveaway.end_date).toISOString().substring(0, 10);
    
    setUpdatedGiveawayData({
      id: giveaway.id,
      name: giveaway.name,
      description: giveaway.description,
      start_date: formattedStartDate,
      end_date: formattedEndDate
    })

    editGiveawayFormRef.current.showModal();
    
  }

  const addPhoto = (e, giveaway) => {
    e.stopPropagation();
    setUpdatedGiveawayData({
      id: giveaway.id,
      name: giveaway.name,
      description: giveaway.description,
      start_date: giveaway.start_date,
      end_date: giveaway.end_date
    })
    addPhotoFormRef.current.showModal()

  }

  const deletePhoto = (e, confirmed, photoId, giveawayName) => {
    e.stopPropagation();
    if (confirmed) {
      deletePhotoCallback(photoId);
      setSelectedGiveawayCallback('all');
    } else {
      setAreYouSureData({
        'itemType': 'Photo',
        'itemId': photoId,
        'itemName': giveawayName,
        'deleteCallback': deletePhoto,
        'callbackArgs': [photoId, giveawayName]
      })
      giveawayAreYouSureDialogRef.current.showModal();
    }
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
    const photos = giveaway.photos.map((photo) => {
      return (
        <div key={photo.id} className='photo-square'>
          <img className='giveaway-photo' src={`https://imagedelivery.net/E868QW-m3V6nzVTKXKDrtg/${photo.cloudflare_id}/public`} alt='' />
          <button className='delete-giveaway-photo-btn' type='button' onClick={(e) => deletePhoto(e, false, photo.id, giveaway.name)}><img src={trashCanIcon} alt='delete' /></button>
        </div>
      )
    })
    
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
        <header>
          <h4 className="giveaway-title"> {giveaway.name} </h4>
          <p className="giveaway-dates"> {giveaway.start_date} - {giveaway.end_date} </p>
        </header>
        <p className="giveaway-description"> {giveaway.description} </p>
        <div className='giveaway-photos-section'>
          <button className='add-photo-btn' type="button" onClick={(e) => addPhoto(e, giveaway)}> Add Photo </button>
          {photos}
        </div>
        <div className='giveaway-winners-section'>
          {winners}
        </div>
        <button type="button" className='edit-giveaway-btn management-button' onClick={(e) => editGiveaway(e, giveaway)}>Edit</button> 
        <button className='management-button' type="button" onClick={(e) => drawWinner(e, giveaway.id)}>Draw Winner</button> 
      </div>
    )
  })

  return (
    <div>
      {giveawaysList.reverse()}
      <NewPhotoForm
        addPhotoFormRef={addPhotoFormRef}
        updatedGiveawayData={updatedGiveawayData}
        createPhotoCallback={createPhotoCallback}
      />
      <EditGiveawayForm 
        editGiveawayFormRef={editGiveawayFormRef}
        updatedGiveawayData={updatedGiveawayData}
        setUpdatedGiveawayDataCallback={setUpdatedGiveawayData}
        updateGiveawayCallback={updateGiveawayCallback}
        deleteGiveawayCallback={deleteGiveawayCallback}
        giveawayAreYouSureDialogRef={giveawayAreYouSureDialogRef}
        setAreYouSureDataCallback={setAreYouSureData}
        setSelectedGiveawayCallback={setSelectedGiveawayCallback}
      />
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

export default ManageGiveaways;
