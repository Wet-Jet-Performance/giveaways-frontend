import { useState, useRef } from "react";
import './Giveaways.css';

const Giveaways = ({giveaways, is_admin, deleteGiveawayCallback, updateGiveawayCallback}) => {

  const dialogFormRef = useRef(null);
  const defaultGiveaway = {
    'id': '',
    'name': '',
    'start_date': '',
    'end_date': ''
  };

  const [updatedGiveawayData, setUpdatedGiveawayData] = useState(defaultGiveaway);

  const editGiveaway = (giveaway) => {

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

  const updateForm = (event) => {
    setUpdatedGiveawayData({...updatedGiveawayData,
      [event.target.name]: event.target.value })
  }

  const giveawaysList = giveaways.map((giveaway) => {
    const editButton = is_admin ? 
      <button type="button" onClick={() => editGiveaway(giveaway)}>edit</button> 
      : '';
    const deleteButton = is_admin ? 
      <button type="button" onClick={() => deleteGiveawayCallback(giveaway.id)}>delete</button> 
      : '';

    return (<div className='giveaway-container' key={giveaway.id}>
        <h4 className="giveaway-title"> {giveaway.name} </h4>
        <p className="giveaway-dates"> {giveaway.start_date} - {giveaway.end_date} </p>
        {editButton}
        {deleteButton}
      </div>
    )
  })

  return (
    <div>
      {giveawaysList}
      <dialog ref={dialogFormRef}>
        <form method='dialog' onSubmit={() => updateGiveawayCallback(updatedGiveawayData)}>
          <label htmlFor='name'> Name </label>
          <input name='name' value={updatedGiveawayData.name} onChange={updateForm}/>
          <label htmlFor='start_date'> Start Date </label>
          <input type='date' name='start_date' value={updatedGiveawayData.start_date} onChange={updateForm}/>
          <label htmlFor='end_date'> End Date </label>
          <input type='date' name='end_date' value={updatedGiveawayData.end_date} onChange={updateForm}/>
          <button id='cancel-create-giveaway' type='button' onClick={() => dialogFormRef.current.close()}>cancel</button>
          <button type='submit'>save</button>
        </form>
      </dialog>
    </div>
    
  );
};

export default Giveaways;
