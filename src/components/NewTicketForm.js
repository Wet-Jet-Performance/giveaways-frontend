import { useState } from 'react';

const NewTicketForm = ({ addTicketsDialogRef, giveaways, participants, createTicketCallback, createParticipantAndTicketCallback }) => {
  const defaultTicket = {
    giveaway_id: giveaways[0].id,
    participant_id: '',
    name: '',
    phone_number: '',
    email: '',
    number_of_tickets: 1
  };

  const [ticketData, setTicketData] = useState(defaultTicket);
  const [selectedParticipant, setSelectedParticipant] = useState(defaultTicket);
  const [selectedGiveaway, setSelectedGiveaway] = useState(defaultTicket.giveaway_id)

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
        setTicketData(newTicket);
      } catch {
        setTicketData(defaultTicket);
      }
    } else {
      const newTicket = {
        ...ticketData,
        [event.target.name]: event.target.value
      };
      setTicketData(newTicket);
    }
  }

  const submitForm = (event) => {
    if (!ticketData.participant_id) {
      createParticipantAndTicketCallback(ticketData.name, ticketData.phone_number, ticketData.email, selectedGiveaway, ticketData.number_of_tickets)
    } else {
      createTicketCallback(selectedGiveaway, ticketData.participant_id, ticketData.number_of_tickets);
    }
    setTicketData(defaultTicket);
    setSelectedParticipant(defaultTicket);
    setSelectedGiveaway(defaultTicket.giveaway_id);
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

  const resetAndCloseForm = () => {
    addTicketsDialogRef.current.close()
    setTicketData(defaultTicket);
    setSelectedParticipant(defaultTicket);
    setSelectedGiveaway(defaultTicket.giveaway_id);
  }

  return (
    <div>
      <dialog ref={addTicketsDialogRef}>
        <header>Add Tickets</header>
        <form method='dialog' onSubmit={submitForm}>
          <label htmlFor='giveaway_id'> Select Giveaway </label>
          <select name='giveaway_id' value={selectedGiveaway} onChange={(e) => setSelectedGiveaway(e.target.value)}>
            {giveawaysDropDown}
          </select>
          <label htmlFor='participants'> Select Participant</label>
          <select onChange={updateForm} name='participants' value={selectedParticipant}>
            <option value={defaultTicket}> New Participant </option>
            {participantsDropDown}
          </select>
          <label htmlFor='name'> Name </label>
          <input name='name' value={ticketData.name} readOnly={ticketData.participant_id ? true : false} onChange={updateForm}/>
          <label htmlFor='phone_number'> Phone Number </label>
          <input type='tel' name='phone_number' value={ticketData.phone_number} readOnly={ticketData.participant_id ? true : false} onChange={updateForm}/>
          <label htmlFor='email'> Email </label>
          <input type='email' name='email' value={ticketData.email} readOnly={ticketData.participant_id ? true : false} onChange={updateForm} />
          <label htmlFor='number_of_tickets'> Number of Tickets </label>
          <input type='number' min='1' name='number_of_tickets' value={ticketData.number_of_tickets} onChange={updateForm}/>
          <button id='cancel-create-Ticket' type='button' onClick={resetAndCloseForm}>cancel</button>
          <button type='submit'>submit</button>
        </form>
      </dialog>
    </div>
  );
};

export default NewTicketForm;