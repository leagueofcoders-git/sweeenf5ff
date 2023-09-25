# Music Site

A single page app to get the top artist tracks upon keying in the artist's Spotify ID.
Spotify API was used to retrieve the data: https://developer.spotify.com/documentation/web-api"# loc-sweeen" 
"# loc-sweeen" 
"# loc-sweeen" 


This is the section that I have changed

```
  //get the artist by name first
   const responseData = await axios.get(`https://api.spotify.com/v1/search?q=${artist_id}&type=album`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

      //once the data is returned, get this artist id from the name
      const id = responseData.data.albums.items[0].artists[0].id
      const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=SG`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
```
