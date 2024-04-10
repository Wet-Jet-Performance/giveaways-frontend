import axios from 'axios';
import { useState, useEffect } from 'react';
import Giveaways from '../components/Giveaways';
import './CurrentGiveaways.css'

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
    <div className='giveaways-body'>
        <h3 id='current-giveaways-header'>Current Giveaways</h3>
        <Giveaways giveaways={giveaways} />
    </div>
  );
};

export default Home;