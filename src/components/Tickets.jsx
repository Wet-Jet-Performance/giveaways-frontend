import { useRef, useState, useEffect } from 'react';
import './Tickets.css';
import AreYouSure from './AreYouSure';
import trashCanIcon from '../assets/trash-can-white.png';

const Tickets = ({ tickets, deleteTicketCallback, selectedGiveaway }) => {
  const defaultTicket = {
    id: 0,
    name: ''
  };

  const [selectedTicket, setSelectedTicket] = useState(defaultTicket);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ticketAreYouSureDialogRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const ticketsPerPage = 10;

  const deleteTicket = (event = null, confirmed = false, ticketId = 0, ticketName = '') => {
    if (confirmed) {
      deleteTicketCallback(selectedTicket.id);
    } else {
      setSelectedTicket({
        id: ticketId,
        name: ticketName
      });
      ticketAreYouSureDialogRef.current.showModal();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  useEffect(() => {
    if (totalPages > 0) {
      setLoading(false);
    }
    setLoading(true);
  }, [currentPage, searchTerm, selectedGiveaway]);

  const filteredTickets = tickets[selectedGiveaway]?.filter((ticket) =>
    ticket.participant_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const ticketsList = currentTickets.map((ticket) => (
    <div className="ticket" key={ticket.id}>
      <header className="ticket-header">
        <p> {ticket.giveaway_name} </p>
        <p className="ticket-id"> Ticket ID - #{ticket.id} </p>
      </header>
      <div className="ticket-body">
        <div className="ticket-details">
          <p> {ticket.participant_name} </p>
          <p> {ticket.participant_phone} </p>
          <p> {ticket.participant_email} </p>
        </div>
        <button
          className="delete-ticket-btn"
          type="button"
          onClick={(e) => deleteTicket(e, false, ticket.id, ticket.participant_name)}
        >
          <img src={trashCanIcon} alt="delete" />
        </button>
      </div>
    </div>
  ));
  return (
    <div id="ticket-list">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
      </div>
      {loading && totalPages === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {ticketsList}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
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
