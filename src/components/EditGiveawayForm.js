import './EditGiveawayForm.css';

const EditGiveawayForm = ({ editGiveawayFormRef, giveawayAreYouSureDialogRef, updatedGiveawayData, setUpdatedGiveawayDataCallback, updateGiveawayCallback, deleteGiveawayCallback, setAreYouSureDataCallback, setSelectedGiveawayCallback }) => {

  const deleteGiveaway = (event, confirmed = false) => {
    if (confirmed) {
      editGiveawayFormRef.current.close()
      deleteGiveawayCallback(updatedGiveawayData.id)
      setSelectedGiveawayCallback('all');
    } else {
      setAreYouSureDataCallback({
        'itemType': 'Giveaway',
        'itemId': updatedGiveawayData.id,
        'itemName': updatedGiveawayData.name,
        'deleteCallback': deleteGiveaway
      })
      giveawayAreYouSureDialogRef.current.showModal();
    }
  }

  const updateForm = (event) => {
    setUpdatedGiveawayDataCallback({
      ...updatedGiveawayData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <dialog ref={editGiveawayFormRef}>
      <button className='close-dialog' type='button' onClick={() => editGiveawayFormRef.current.close()}>x</button>
      <header>Edit Giveaway</header>
      <form method='dialog' onSubmit={() => updateGiveawayCallback(updatedGiveawayData)}>
        <label htmlFor='name'> Name </label>
        <input name='name' value={updatedGiveawayData.name} onChange={updateForm} />
        <label htmlFor='start_date'> Start Date </label>
        <input type='date' name='start_date' value={updatedGiveawayData.start_date} onChange={updateForm} />
        <label htmlFor='end_date'> End Date </label>
        <input type='date' name='end_date' value={updatedGiveawayData.end_date} onChange={updateForm} />
        <div className='dialog-buttons'>
          <button className='dialog-button' type='submit'>Save</button>
          <button className='dialog-button' type='button' id='delete-giveaway-btn' onClick={deleteGiveaway}>Delete Giveaway</button>
        </div>
      </form>
    </dialog>
  )
}

export default EditGiveawayForm;