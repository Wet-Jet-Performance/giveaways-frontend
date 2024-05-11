import { useRef, useState } from 'react';
import './Tickets.css';
import AreYouSure from './AreYouSure';

const Tickets = ({ tickets, deleteTicketCallback, selectedGiveaway }) => {

  const defaultTicket = {
    id: 0,
    name: ''
  }

  const [selectedTicket, setSelectedTicket] = useState(defaultTicket);
  const ticketAreYouSureDialogRef = useRef(null);

  const deleteTicket = (event=null, confirmed=false, ticketId=0, ticketName='') => {
    if (confirmed) { 
      deleteTicketCallback(selectedTicket.id);
    } else {
      console.log(event.target);
      setSelectedTicket({
        id: ticketId,
        name: ticketName
      })
      ticketAreYouSureDialogRef.current.showModal();
    }
  }

  let ticketsList;
  try {
    ticketsList = tickets[selectedGiveaway].map((ticket) => {

      return (<div className='ticket' key={ticket.id}>
        <header className='ticket-header'>
          <p> {ticket.giveaway_name} </p>
          <p className='ticket-id'> Ticket ID - #{ticket.id} </p>
        </header>
        <div className='ticket-body'>
          <div className='ticket-details'>
            <p> {ticket.participant_name} </p>
            <p> {ticket.participant_phone} </p>
            <p> {ticket.participant_email} </p>
          </div>
          <button className='delete-ticket-btn' type='button' onClick={(e) => deleteTicket(e, false, ticket.id, ticket.participant_name)}>Delete</button>
        </div>
      </div>
      )
    })
  } catch {
    ticketsList = [];
  }

  return (
    <div id='ticket-list'>
      {ticketsList}
      <AreYouSure
        areYouSureDialogRef={ticketAreYouSureDialogRef}
        itemType={'Ticket'}
        itemId={selectedTicket.id}
        itemName={selectedTicket.name}
        deleteItemCallback={deleteTicket}
      />
    </div>

  );
};

export default Tickets;
