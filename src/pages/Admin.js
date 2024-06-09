import { useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ManageGiveaways from '../components/ManageGiveaways';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Tickets from '../components/Tickets';
import NewTicketForm from '../components/NewTicketForm';
import './Admin.css'
import NewGiveawayForm from '../components/NewGiveawayForm';

const Admin = ({ giveaways, tickets, participants, winners,  createGiveawayCallback, deleteGiveawayCallback, updateGiveawayCallback, createTicketCallback, deleteTicketCallback, createParticipantAndTicketCallback, createWinnerCallback, deleteWinnerCallback, createPhotoCallback, deletePhotoCallback }) => {

  const [selectedGiveaway, setSelectedGiveaway] = useState('all')
  const {loginWithRedirect, isAuthenticated} = useAuth0();

  const createGiveawayDialogRef = useRef(null);
  const addTicketsDialogRef = useRef(null);

  const loginRedirect = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/admin"
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div>
        <NavBar />
        <div id='unauthorized-notice'>
          <p> Please login as an administrator to access this page. </p>
          <button onClick={loginRedirect}> Login </button>
        </div>
        <Footer admin_page_active={true}/>
      </div>
  )}

  return (
    <div className='admin-container'>
      <NavBar />
      <div className='admin-headers'>
        <header className='management-header'>
          <h1 id='manage-giveaways-title'>Manage Giveaways</h1>
          <button className='plus-button' type='button' onClick={() => createGiveawayDialogRef.current.showModal()}>+</button>
        </header>
        <header className='management-header'>
          <h1 id='manage-tickets-title'>Tickets</h1>
          <button className='plus-button' type='button' onClick={() => addTicketsDialogRef.current.showModal()}>+</button>
        </header>
      </div>
      <main className='admin-body'>
        <section className='admin-giveaways'>
          <ManageGiveaways 
            giveaways={giveaways}
            tickets={tickets}
            winnersList={winners}
            deleteGiveawayCallback={deleteGiveawayCallback}
            updateGiveawayCallback={updateGiveawayCallback}
            selectedGiveaway={selectedGiveaway}
            setSelectedGiveawayCallback={setSelectedGiveaway}
            createWinnerCallback={createWinnerCallback}
            deleteWinnerCallback={deleteWinnerCallback}
            createPhotoCallback={createPhotoCallback}
            deletePhotoCallback={deletePhotoCallback}
          />
          <NewGiveawayForm
            createGiveawayDialogRef={createGiveawayDialogRef}
            createGiveawayCallback={createGiveawayCallback} 
          />
        </section>
        <section className='admin-tickets'>
          <Tickets
            tickets={tickets}
            deleteTicketCallback={deleteTicketCallback}
            selectedGiveaway={selectedGiveaway}
          />
          <NewTicketForm 
            addTicketsDialogRef={addTicketsDialogRef}
            giveaways={giveaways}
            participants={participants}
            createTicketCallback={createTicketCallback}
            createParticipantAndTicketCallback={createParticipantAndTicketCallback}
          />
        </section>
      </main>
      <Footer admin_page_active={true}/>
    </div>
  );
};

export default Admin;