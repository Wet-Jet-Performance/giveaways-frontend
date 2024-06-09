import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CurrentGiveaways from './pages/CurrentGiveaways'
import Admin from './pages/Admin'

function App() {
  const api = process.env.REACT_APP_BACKEND_API;

  const [giveaways, setGiveaways] = useState([]);
  const [tickets, setTickets] = useState({});
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState({});

  useEffect(() => {
    getGiveaways();
    getTickets();
    getParticipants();
    getWinners();
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
            end_date: giveaway.end_date,
            winners: giveaway.winners,
            photos: giveaway.photos
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
        let newTickets = {'all': []};
        for (const ticket of response.data) {
          newTickets.all.push({
              id: ticket.id,
              giveaway_id: ticket.giveaway_id,
              participant_id: ticket.participant_id,
              giveaway_name: ticket.giveaway_name,
              participant_name: ticket.participant_name,
              participant_phone: ticket.participant_phone,
              participant_email: ticket.participant_email
            })
          try {
            newTickets[ticket.giveaway_id].push({
              id: ticket.id,
              giveaway_id: ticket.giveaway_id,
              participant_id: ticket.participant_id,
              giveaway_name: ticket.giveaway_name,
              participant_name: ticket.participant_name,
              participant_phone: ticket.participant_phone,
              participant_email: ticket.participant_email
            })
          } catch {
            newTickets[ticket.giveaway_id] = [{
              id: ticket.id,
              giveaway_id: ticket.giveaway_id,
              participant_id: ticket.participant_id,
              giveaway_name: ticket.giveaway_name,
              participant_name: ticket.participant_name,
              participant_phone: ticket.participant_phone,
              participant_email: ticket.participant_email
            }]
          }
        };
        setTickets(newTickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getParticipants = () => {
    axios
      .get(`${api}/participants`)
      .then((response) => {
        const newParticipants = response.data.map((participant) => {
          return {
            id: participant.id,
            name: participant.name,
            phone_number: participant.phone_number,
            email: participant.email
            
          };
        });
        setParticipants(newParticipants);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getWinners = () => {
    axios
      .get(`${api}/winners`)
      .then((response) => {
        let newWinners = {};
        for (const winner of response.data) {
          newWinners[winner.id] = {
            giveaway_id: winner.giveaway_id,
            participant_id: winner.participant_id,
            winning_ticket_id: winner.winning_ticket_id,
            giveaway_name: winner.giveaway_name,
            participant_name: winner.participant_name,
            participant_phone: winner.participant_phone,
            participant_email: winner.participant_email
          }
        };
        setWinners(newWinners);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const createGiveaway = (newGiveaway) => {
    axios
      .post(`${api}/giveaways`, newGiveaway)
      .then((response) => {
        getGiveaways();
        const updatedTickets = {
          ...tickets,
          [newGiveaway.name]: []
        }
        setTickets(updatedTickets);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateGiveaway = (updatedGiveaway) => {
    axios
      .put(`${api}/giveaways/${updatedGiveaway.id}`, updatedGiveaway)
      .then((response) => {
        getGiveaways();
        getTickets();
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
        getTickets();
        getWinners();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const createTicket = (giveaway_id, participant_id, num_tickets) => {
    axios
      .post(`${api}/tickets`, {
        giveaway_id: giveaway_id,
        participant_id: participant_id,
        number_of_tickets: num_tickets
      })
      .then((response) => {
        getTickets();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteTicket = (ticketId) => {
    axios
      .delete(`${api}/tickets/${ticketId}`)
      .then((response) => {
        getTickets();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const createParticipant = (name, phone_number, email) => {
    axios
      .post(`${api}/participants`, {
        name: name,
        phone_number: phone_number,
        email: email
      })
      .then((response) => {
        getParticipants();
        return response.data.id
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const createParticipantAndTicket = (name, phone_number, email, giveaway_id, num_tickets) => {
    axios
      .post(`${api}/participants`, {
        name: name,
        phone_number: phone_number,
        email: email
      })
      .then((response) => {
        createTicket(giveaway_id, response.data.id, num_tickets);
        getParticipants();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createWinner = (winningTicketId, participantId, giveawayId, name, phone_number, email) => {
    axios
      .post(`${api}/winners`, {
        winning_ticket_id: winningTicketId,
        giveaway_id: giveawayId,
        participant_id: participantId
      })
      .then((response) => {
        getGiveaways();
        const newWinners = {
          ...winners,
          [response.data.id]: {
            giveaway_id: giveawayId,
            participant_id: participantId,
            winning_ticket_id: winningTicketId,
            participant_name: name,
            participant_phone: phone_number,
            participant_email: email
          }
        }
        setWinners(newWinners);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteWinner = (winnerId, giveawayId) => {
    axios
      .delete(`${api}/winners/${winnerId}`)
      .then((response) => {
        const newWinners = {...winners};
        delete newWinners[winnerId];
        setWinners(newWinners);
        const newGiveaways = giveaways.map((giveaway) => {
          if (giveaway.id === giveawayId) {
            giveaway.winners = giveaway.winners.filter((winner) => {
              return winner.id !== winnerId
            })
          }
          return giveaway
        })
        setGiveaways(newGiveaways);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const createPhoto = (photo, giveawayId) => {
    axios
      .get(`${api}/photos/photo-upload`)
      .then((response) => {
        console.log(response.data.result.uploadURL);
        uploadPhotoToCDN(response.data.result.uploadURL, photo, giveawayId)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const uploadPhotoToCDN = (uploadUrl, photo, giveawayId) => {
    console.log('sending photo to cloudflare')
    const formData = new FormData();
    formData.append('file', photo);
    axios
      .post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        addPhotoToDB(response.data.result.id, giveawayId)
      })
      .catch((err) => {
        if (err.response.data.errors[0].code === 5443) {
          alert("Photo upload failed: photos must be 10mb or smaller. Please try again with a smaller photo.")
        }
        console.log(err)
      })
  }

  const addPhotoToDB = (cloudflareId, giveawayId) => {
    console.log('sending photo to DB', giveawayId)
    axios
      .post(`${api}/photos`, {
        cloudflare_id: cloudflareId,
        giveaway_id: giveawayId
      })
      .then((response) => {
        getGiveaways();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deletePhoto = (photoId) => {
    axios
      .delete(`${api}/photos/${photoId}`)
      .then((response) => {
        getGiveaways();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/giveaways" element={<CurrentGiveaways giveaways={giveaways} winnersList={winners} />} />
      <Route path="/admin" element={
        <Admin
          giveaways={giveaways}
          tickets={tickets}
          participants={participants}
          winners={winners}
          createGiveawayCallback={createGiveaway}
          deleteGiveawayCallback={deleteGiveaway}
          updateGiveawayCallback={updateGiveaway}
          createTicketCallback={createTicket}
          deleteTicketCallback={deleteTicket}
          createParticipantCallback={createParticipant}
          createParticipantAndTicketCallback={createParticipantAndTicket}
          createWinnerCallback={createWinner}
          deleteWinnerCallback={deleteWinner}
          createPhotoCallback={createPhoto}
          deletePhotoCallback={deletePhoto}
        />}
      />
    </Routes>
  );
}

export default App;