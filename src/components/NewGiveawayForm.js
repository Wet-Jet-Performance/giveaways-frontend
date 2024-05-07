import { useState } from 'react';

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
      <header>Create Giveaway</header>
      <form method='dialog' onSubmit={submitForm}>
        <label htmlFor='name'> Name </label>
        <input name='name' value={newGiveawayData.name} onChange={updateForm} />
        <label htmlFor='start_date'> Start Date </label>
        <input type='date' name='start_date' value={newGiveawayData.start_date} onChange={updateForm} />
        <label htmlFor='end_date'> End Date </label>
        <input type='date' name='end_date' value={newGiveawayData.end_date} onChange={updateForm} />
        <button id='cancel-create-giveaway' type='button' onClick={() => createGiveawayDialogRef.current.close()}>cancel</button>
        <button type='submit'>submit</button>
      </form>
    </dialog>

  );
};

export default NewGiveawayForm;