import { useState, useRef } from 'react';

const NewTicketForm = ({ giveaways, participants, createTicketCallback }) => {
  const defaultTicket = {
    giveaway_id: giveaways[0].id,
    participant_id: '',
    name: '',
    phone_number: '',
    email: '',
    new_tickets: 1
  };

  const [ticketData, setTicketData] = useState(defaultTicket);
  const addTicketsDialogRef = useRef(null);

  const updateForm = (event) => {
    if (event.target.name === 'participants') {
      try {
        const newTicket = {
          ...ticketData,
          participant_id: participants[event.target.value].id,
          name: participants[event.target.value].name,
          phone_number: participants[event.target.value].phone_number,
          email: participants[event.target.value].email
        }
        console.log(newTicket);
        setTicketData(newTicket);
      } catch {
        console.log(ticketData);
        setTicketData(defaultTicket);
      }
    } else {
      const newTicket = {
        ...ticketData,
        [event.target.name]: event.target.value
      };
      console.log(newTicket);
      setTicketData(newTicket);
    }
  }

  const submitForm = (event) => {
    createTicketCallback(ticketData);
    setTicketData(defaultTicket);
  }

  const giveawaysDropDown = giveaways.map((giveaway) => {
    return (
      <option key={giveaway.id} value={giveaway.id}> {giveaway.name} </option>
    )
  })
  
  const participantsDropDown = participants.map((participant, index) => {
    return (
      <option key={participant.id} value={index}> {participant.name} {participant.phone_number} </option>
    )
  })

  return (
    <div>
      <dialog ref={addTicketsDialogRef}>
        <header>Add Tickets</header>
        <form method='dialog'>
          <label htmlFor='giveaway_id'> Select Giveaway </label>
          <select name='giveaway_id' defaultValue={defaultTicket.giveaway_id}>
            {giveawaysDropDown}
          </select>
          <label htmlFor='participants'> Select Participant</label>
          <select onChange={updateForm} name='participants' defaultValue={defaultTicket}>
            <option value={defaultTicket}> New Participant </option>
            {participantsDropDown}
          </select>
          <label htmlFor='name'> Name </label>
          <input name='name' value={ticketData.name} readOnly={ticketData.participant_id ? true : false} onChange={updateForm}/>
          <label htmlFor='phone_number'> Phone Number </label>
          <input type='tel' name='phone_number' value={ticketData.phone_number} readOnly={ticketData.participant_id ? true : false} onChange={updateForm}/>
          <label htmlFor='email'> Email </label>
          <input type='email' name='email' value={ticketData.email} readOnly={ticketData.participant_id ? true : false} onChange={updateForm} />
          <label htmlFor='new_tickets'> Number of Tickets </label>
          <input type='number' min='1' name='new_tickets' value={ticketData.new_tickets} onChange={updateForm}/>
          <button id='cancel-create-Ticket' type='button' onClick={() => addTicketsDialogRef.current.close()}>cancel</button>
          <button type='submit'>submit</button>
        </form>
      </dialog>
      <button id='add-tickets-button' type='button' onClick={() => addTicketsDialogRef.current.showModal()}>Add Tickets</button>
    </div>
  );
};

export default NewTicketForm;