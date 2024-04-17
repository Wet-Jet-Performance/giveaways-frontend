import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CurrentGiveaways from './pages/CurrentGiveaways'
import Admin from './pages/Admin'

function App() {
  const api = 'http://127.0.0.1:5000'

  const [giveaways, setGiveaways] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    getGiveaways();
    getTickets();
    
  }, []);

  const getGiveaways = () => {
    axios
      .get(`${api}/giveaways`)
      .then((response) => {
        const newGiveaways = response.data.map((giveaway) => {
          return {
            id: giveaway.id,
            name: giveaway.name,
            start_date: giveaway.start_date,
            end_date: giveaway.end_date
          };
        });
        setGiveaways(newGiveaways);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getTickets = () => {
    axios
      .get(`${api}/tickets`)
      .then((response) => {
        const newTickets = response.data.map((ticket) => {
          return {
            id: ticket.id,
            giveaway_id: ticket.giveaway_id,
            participant_id: ticket.participant_id,
            giveaway_name: ticket.giveaway_name,
            participant_name: ticket.participant_name,
            participant_phone: ticket.participant_phone,
            participant_email: ticket.participant_email
            
          };
        });
        setTickets(newTickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const createGiveaway = (newGiveaway) => {
    axios
      .post(`${api}/giveaways`, newGiveaway)
      .then((response) => {
        const formattedStartDate = new Date(newGiveaway.start_date).toLocaleDateString('en-us', { 'month': 'long', 'day': 'numeric', 'year': 'numeric', timeZone: 'UTC' });
        const formattedEndDate = new Date(newGiveaway.end_date).toLocaleDateString('en-us', { 'month': 'long', 'day': 'numeric', 'year': 'numeric', timeZone: 'UTC' });
        newGiveaway.start_date = formattedStartDate;
        newGiveaway.end_date = formattedEndDate;
        const updatedGiveaways = [
          ...giveaways,
          {
            'id': response.data.id,
            'name': newGiveaway.name,
            'start_date': newGiveaway.start_date,
            'end_date': newGiveaway.end_date
          }
        ]
        setGiveaways(updatedGiveaways);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateGiveaway = (updatedGiveaway) => {
    axios
      .put(`${api}/giveaways/${updatedGiveaway.id}`, updatedGiveaway)
      .then((response) => {
        const updatedGiveaways = giveaways.map((giveaway) => {
          if (giveaway.id === updatedGiveaway.id) {
            const formattedStartDate = new Date(updatedGiveaway.start_date).toLocaleDateString('en-us',{'month': 'long', 'day': 'numeric', 'year': 'numeric', timeZone: 'UTC'});
            const formattedEndDate = new Date(updatedGiveaway.end_date).toLocaleDateString('en-us',{'month': 'long', 'day': 'numeric', 'year': 'numeric', timeZone: 'UTC'});
            updatedGiveaway.start_date = formattedStartDate;
            updatedGiveaway.end_date = formattedEndDate;
            return updatedGiveaway;
          } else {
            return giveaway
          }
        })
        
        setGiveaways(updatedGiveaways);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteGiveaway = (giveawayId) => {
    axios
      .delete(`${api}/giveaways/${giveawayId}`)
      .then((response) => {
        const updatedGiveaways = giveaways.filter((giveaway) => giveaway.id !== giveawayId);
        setGiveaways(updatedGiveaways);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const createTicket = (newTicket) => {
    axios
      .post(`${api}/tickets`, newTicket)
      .then((response) => {
        getTickets();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/giveaways" element={<CurrentGiveaways giveaways={giveaways} />} />
      <Route path="/admin" element={
        <Admin
            giveaways={giveaways}
            tickets={tickets}
            createGiveawayCallback={createGiveaway}
            deleteGiveawayCallback={deleteGiveaway}
            updateGiveawayCallback={updateGiveaway}
            createTicketCallback={createTicket}/>} />
    </Routes>
  );
}

export default App;