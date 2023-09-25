import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Genre from './pages/Genre';

import { MusicContext } from './Context';

//guide: https://ritvikbiswas.medium.com/connecting-to-the-spotify-api-using-node-js-and-axios-client-credentials-flow-c769e2bee818

//const axios = require('axios');
const qs = require('qs');

const SPOTIFY_API_ID = 'e1dc6811814a4dc181bd3eb1a58a568c';
const SPOTIFY_CLIENT_SECRET = '358cd48e7bba4db3b9b7f47716edede3';
//const auth_token = `${SPOTIFY_API_ID}:${SPOTIFY_CLIENT_SECRET}`;
const auth_token = Buffer.from(`${SPOTIFY_API_ID}:${SPOTIFY_CLIENT_SECRET}`, 'utf-8').toString('base64');

//console.log('auth_token is ' + auth_token);

const getAuth = async () => {
  try {
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({ 'grant_type': 'client_credentials' });

    const response = await axios.post(token_url, data, {
      headers: {
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    //return access token
    return response.data.access_token;
    //console.log(response.data.access_token);   
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
}

const access_token = await getAuth();

function App() {
  return (
    <div>
      <MusicContext.Provider value={access_token}>
        <Header />

        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/favorites' element={<Favorites />} />
            <Route exact path='/genre' element={<Genre />} />
          </Routes>
        </div>

        <Footer/>


      </MusicContext.Provider>

    </div>
  );
}

export default App;
