import { useState } from 'react';
import './NewGiveawayForm.css';

const NewGiveawayForm = ({ createGiveawayDialogRef, createGiveawayCallback}) => {

    const defaultGiveaway = {
      'name': '',
      'start_date': '',
      'end_date': ''
    };
  
    const [newGiveawayData, setNewGiveawayData] = useState(defaultGiveaway);
  
    const updateForm = (event) => {
      setNewGiveawayData({
        ...newGiveawayData,
        [event.target.name]: event.target.value
      })
    }
  
    const submitForm = (event) => {
      createGiveawayCallback(newGiveawayData);
      setNewGiveawayData(defaultGiveaway);
    }


  return (
    <dialog ref={createGiveawayDialogRef}>
      <button className='close-dialog' type='button' onClick={() => createGiveawayDialogRef.current.close()}>x</button>
      <header>Create Giveaway</header>
      <form method='dialog' onSubmit={submitForm}>
        <label htmlFor='name'> Name </label>
        <input name='name' value={newGiveawayData.name} onChange={updateForm} required/>
        <label htmlFor='start_date'> Start Date </label>
        <input type='date' name='start_date' value={newGiveawayData.start_date} onChange={updateForm} required/>
        <label htmlFor='end_date'> End Date </label>
        <input type='date' name='end_date' value={newGiveawayData.end_date} onChange={updateForm} required/>
        <button className='dialog-button' type='submit'>Submit</button>
      </form>
    </dialog>

  );
};

export default NewGiveawayForm;