import { useState, useRef } from 'react';

const NewTicketForm = ({ createTicketCallback }) => {
  const defaultTicket = {id: ''};
  const [ticketData, setTicketData] = useState(defaultTicket);
  const addTicketsDialogRef = useRef(null);

  const updateForm = (event) => {
    setTicketData({
      ...ticketData,
      [event.target.name]: event.target.value
    })
  }

  const submitForm = (event) => {
    createTicketCallback(ticketData);
    setTicketData(defaultTicket);
  }

  return (
    <div>
      <dialog ref={addTicketsDialogRef}>
        <header>Add Tickets</header>
        <form method='dialog'>
          <label htmlFor='Ticket'> Ticket </label>
          <input name='Ticket' list='Tickets' />
          <datalist id='Tickets'></datalist>
          <button id='cancel-create-Ticket' type='button' onClick={() => addTicketsDialogRef.current.close()}>cancel</button>
          <button type='submit'>submit</button>
        </form>
      </dialog>
      <button id='add-tickets-button' type='button' onClick={() => addTicketsDialogRef.current.showModal()}>Add Tickets</button>
    </div>
  );
};

export default NewTicketForm;