import React, { useState, useContext, useEffect } from 'react'
import { MusicContext } from '../Context';
import axios from 'axios';
import Card from '../components/Card';

const Favorites = () => {
    const context_access_token = useContext(MusicContext);
    const [musicList, setMusicList] = useState([]);

    const getAudioFeatures_Track = async (access_token) => {
        const api_url = `https://api.spotify.com/v1/recommendations?limit=21&seed_artists=0bAsR2unSRpn6BQPEnNlZm&seed_genres=jpop%2C+kpop%2C+pop'`;

        try {
            const response = await axios.get(api_url, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            return response.data.tracks;
        } catch (error) {
            console.log(error);
            return []; // Return an empty array in case of an error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (musicList.length === 0) {
                const tracks = await getAudioFeatures_Track(context_access_token);
                setMusicList(tracks);
            }
        };

        fetchData();
        console.log(musicList);
    }, [context_access_token, musicList]);

    return (
        <div className='container'>
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

export default Favorites;