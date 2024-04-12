import { useState, useRef } from 'react';
import Giveaways from '../components/Giveaways';
import NavBar from '../components/NavBar';
import './Admin.css'

const Admin = ({giveaways, createGiveawayCallback, deleteGiveawayCallback, updateGiveawayCallback}) => {

  const defaultGiveaway = {
    'name': '',
    'start_date': '',
    'end_date': ''
  };

  const [newGiveawayData, setNewGiveawayData] = useState(defaultGiveaway);
  const createGiveawayDialogRef = useRef(null);

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
    <div className='admin-body'>
      <NavBar />
      <h3>Manage Giveaways</h3>
      <Giveaways giveaways={giveaways} is_admin={true} deleteGiveawayCallback={deleteGiveawayCallback} updateGiveawayCallback={updateGiveawayCallback}/>
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
      <button id='create-giveaway-button' onClick={() => createGiveawayDialogRef.current.showModal()}> Create Giveaway </button>
    </div>
  );
};

export default Admin;