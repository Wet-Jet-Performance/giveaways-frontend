import { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Giveaways from '../components/Giveaways';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Tickets from '../components/Tickets';
import NewTicketForm from '../components/NewTicketForm';
import './Admin.css'

const Admin = ({giveaways, tickets, participants, createGiveawayCallback, deleteGiveawayCallback, updateGiveawayCallback, createTicketCallback}) => {

  const defaultGiveaway = {
    'name': '',
    'start_date': '',
    'end_date': ''
  };

  const {loginWithRedirect, isAuthenticated} = useAuth0();
  const [newGiveawayData, setNewGiveawayData] = useState(defaultGiveaway);
  const createGiveawayDialogRef = useRef(null);
  const addTicketsDialogRef = useRef(null);

  console.log(isAuthenticated);

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
    <div>
      <NavBar />
      <main className='admin-body'>
        <h3>Manage Giveaways</h3>
        <section className='admin-giveaways'>
          <Giveaways giveaways={giveaways} is_admin={true} deleteGiveawayCallback={deleteGiveawayCallback} updateGiveawayCallback={updateGiveawayCallback} />
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
        </section>
        <section className='admin-tickets'>
          <h3>Tickets</h3>
          <Tickets tickets={tickets}/>
          <NewTicketForm giveaways={giveaways} participants={participants} createTicketCallback={createTicketCallback}/>
        </section>
      </main>
      <Footer admin_page_active={true}/>
    </div>
  );
};

export default Admin;