import './Tickets.css';

const Tickets = ({ tickets, deleteTicketCallback }) => {

  const ticketsList = tickets.map((ticket) => {

    return (<div className='ticket' key={ticket.id}>
      <h4> {ticket.giveaway_name} </h4>
      <p> Ticket ID - #{ticket.id} </p>
      <p> {ticket.participant_name} </p>
      <p> {ticket.participant_phone} </p>
      <p> {ticket.participant_email} </p>
      <button type="button" onClick={() => deleteTicketCallback(ticket.id)}>delete</button>
    </div>
    )
  })

  return (
    <div id="ticket-list">
      {ticketsList}
    </div>

  );
};

export default Tickets;
