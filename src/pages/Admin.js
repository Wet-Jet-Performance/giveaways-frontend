import axios from 'axios';
import { useState, useEffect } from 'react';
import Giveaways from '../components/Giveaways';
import './Admin.css'

const Home = () => {
    const api = 'http://127.0.0.1:5000'

    const [giveaways, setGiveaways] = useState([]);
  
    useEffect(() => {
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
    }, []);

  return (
    <div className='admin-body'>
        <h3>Manage Giveaways</h3>
        <Giveaways giveaways={giveaways} />
        <button id='create-giveaway-button'> Create Giveaway </button>
        <div className='create-giveaway-modal-hidden'>
            <header> Create Giveaway </header>
            <form>

            </form>
        </div>
    </div>
  );
};

export default Home;