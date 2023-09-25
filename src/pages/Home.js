import React, { useState, useContext, useEffect } from 'react'
import { MusicContext } from '../Context';
import axios from 'axios';
import Card from '../components/Card';
import { useForm } from "react-hook-form";

const Home = () => {
  const context_access_token = useContext(MusicContext);
  const [musicList, setMusicList] = useState([]);
  const [api_url, setAPI_url] = useState('https://api.spotify.com/v1/recommendations?limit=21&seed_artists=0bAsR2unSRpn6BQPEnNlZm&seed_genres=jpop%2C+pop%2C+kpop');
  const [searchArtist, setSearchArtist] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setSearchArtist(event.target.value);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const tracks = await getArtistTracks(context_access_token, searchArtist);
    setMusicList(tracks);
  }

  const getReccomendations = async (access_token, api_url) => {

    try {
      const response = await axios.get(api_url, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      
     // console.log(response.data.tracks)

      return response.data.tracks;
    } catch (error) {
      //console.log(error);
      setError(true);
    }
  };

  const getArtistTracks = async (access_token, artist_id) => {
    try {

    const responseData = await axios.get(`https://api.spotify.com/v1/search?q=${artist_id}&type=album`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

      const id = responseData.data.albums.items[0].artists[0].id
      const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=SG`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });

      setError(false);	  
    return response.data.tracks;      

    } catch (error) {
      //console.log(error);
      setError(true);
      return musicList;

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (musicList.length === 0) {
        const tracks = await getReccomendations(context_access_token, api_url);
        setMusicList(tracks);
      }
    };

    fetchData();
    // console.log(musicList);

  }, [context_access_token, musicList]);

  return (
    <div className='container'>
      <form className='mb-form'>
        <div className='search-bar'>
          <input type="text" name="searchTitle" onChange={handleChange} value={searchArtist} className='form-control' placeholder='Search by Spotify artist name' />
          <span>
            <button className='btn btn-primary' type='submit' onClick={handleSearch}>Search</button>
          </span>
        </div>
        {error ? <div className='input-field'>
          <label className='error'>Please key in a valid artist name.</label>
        </div> : null}

      </form>
      <div className='row card-row'>
        {musicList.map((music) => (
          <div className='col-md-4' key={music.id}>
            <Card
              imageURL={music.album.images[0].url}
              songTitle={music.name}
              artist={music.artists[0].name}
              url={music.external_urls.spotify}
            />
          </div>
        ))}
      </div>
    </div>
  );


};

export default Home;