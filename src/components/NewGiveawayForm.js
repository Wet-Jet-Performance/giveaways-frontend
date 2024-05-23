import { useRef, useState } from 'react';
import './NewGiveawayForm.css';

const NewGiveawayForm = ({ createGiveawayDialogRef, createGiveawayCallback}) => {

    const defaultGiveaway = {
      'name': '',
      'start_date': '',
      'end_date': '',
      'photos': []
    };
  
    const [newGiveawayData, setNewGiveawayData] = useState(defaultGiveaway);
    const photoUploadRef = useRef(null);
  
    const updateForm = (event) => {
      if (event.target.name === 'giveaway_photos') {
        let updatedGiveawayData = {...newGiveawayData, photos: []};
        for (const photo of event.target.files) {
          updatedGiveawayData['photos'].push(photo);
        }
        setNewGiveawayData(updatedGiveawayData);
      } else {
        setNewGiveawayData({
          ...newGiveawayData,
          [event.target.name]: event.target.value
        });
      }
    }
  
    const submitForm = (event) => {
      createGiveawayCallback(newGiveawayData);
      setNewGiveawayData(defaultGiveaway);
      photoUploadRef.current.value = null;
    }

    const resetAndCloseForm = () => {
      createGiveawayDialogRef.current.close()
      setNewGiveawayData(defaultGiveaway);
      photoUploadRef.current.value = null;
    }


  return (
    <dialog ref={createGiveawayDialogRef}>
      <button className='close-dialog' type='button' onClick={resetAndCloseForm}>x</button>
      <header>Create Giveaway</header>
      <form method='dialog' onSubmit={submitForm}>
        <label htmlFor='name'> Name </label>
        <input id='name' name='name' value={newGiveawayData.name} onChange={updateForm} required/>
        <label htmlFor='start_date'> Start Date </label>
        <input type='date' id='start_date' name='start_date' value={newGiveawayData.start_date} onChange={updateForm} required/>
        <label htmlFor='end_date'> End Date </label>
        <input type='date' id='end_date' name='end_date' value={newGiveawayData.end_date} onChange={updateForm} required/>
        <label htmlFor='giveaway_photos'> Upload Photos </label>
        <input type='file' id='giveaway_photos' name='giveaway_photos' accept='image/*' onChange={updateForm} ref={photoUploadRef} multiple />
        <button className='dialog-button' type='submit'>Submit</button>
      </form>
    </dialog>

  );
};

export default NewGiveawayForm;