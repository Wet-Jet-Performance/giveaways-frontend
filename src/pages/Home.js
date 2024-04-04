import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Home.css"
import Giveaways from '../components/Giveaways';

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
    <div>
      <h1>Wet Jet Performance</h1>
      <h2>Giveaways</h2>
      <h3>Current Giveaways</h3>
      <p>More Wet Jet Performance</p>
      <Giveaways giveaways={giveaways}/>
    </div>
  );
};

export default Home;
