const Tickets = ({tickets}) => {

  const ticketsList = tickets.map((ticket) => {

    return (<div key={ticket.id}>
        <h4> {ticket.giveaway_name} </h4>
        <p> {ticket.participant_name} </p>
        <p> {ticket.participant_phone} </p>
        <p> {ticket.participant_email} </p>
        <button type="button">delete</button>
      </div>
    )
  })

  return (
    <div>
      {ticketsList}
    </div>
    
  );
};

export default Tickets;
