import axios from 'axios';
import { useState, useEffect } from 'react';
import './Home.css'
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
    <div className='home-body'>
      <div className='landing-page'>
        <h1 className='site-title'>Wet Jet Performance</h1>
        <h2 className='site-title'>Giveaways</h2>
        <div className='landing-links'>
          <h3 id='current-giveaways-header'>Current Giveaways</h3>
          <p id='more-wjp-link'>More Wet Jet Performance</p>
        </div>
      </div>
      <div className='current-giveaways'>
       <Giveaways giveaways={giveaways}/>
      </div> 
    </div>
  );
};

export default Home;
