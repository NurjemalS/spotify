import {Routes, Route, useNavigate} from 'react-router-dom';
import qs from 'qs';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  Tracks from './Tracks';
import { Credentials } from './Credentials'
import {Buffer} from 'buffer';
Buffer.from('anything','base64');



interface User{
   username: string;
   follower_count: number;
   image_url: string;
   country: string;
}

interface Tracks{

}
/*export const getAuth = async () => {
  
  
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: 'b5b64c9cc75043e5b971bc79a0b52f2b',
      password: '663bddf7ad7e4c58b153f8793b163386',
    },
  };
  const data = {
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    );
    console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};*/



function App() {

  
  


  //console.log("rendering")
  const [user, setUser] = useState<User>({
    username: '',
    follower_count: 0,
    image_url: '',
    country: ''
  });

  const [tracks, setTracks] = useState([])
  const [tracksTotal, setTracksTotal] = useState<Tracks>('')
  const [token, setToken] = useState('')
  const [code, setCode] = useState('')

    useEffect(()=>{

      if ( window.location.search.length <= 0 ){
        let url = 'https://accounts.spotify.com/authorize';
        url += '?client_id=b5b64c9cc75043e5b971bc79a0b52f2b';
        url += "&response_type=code";
        url += '&redirect_uri=http://127.0.0.1:3000';
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
        window.location.href = url;
      }
    
      let a = ''
      const queryString = window.location.search;
      if ( queryString.length > 0 ){
          const urlParams = new URLSearchParams(queryString);
          a = urlParams.get('code') || ''
          setCode(a)
      }
    
     

      axios.post('https://accounts.spotify.com/api/token',{
        data: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'http://127.0.0.1:3000'
        },
       
        'headers': {
          'Authorization': 'Basic ' +  (new Buffer(new Credentials().getClientId() + ':' + new Credentials().getSecretId()).toString('base64')),
          'Content-Type':'application/x-www-form-urlencoded'
       }

      }).then(tokenresponse => {
        console.log(tokenresponse.data);
        //setToken(tokenresponse.data.access_token);
      }).catch(error => console.log(error));


    }, [])


    /**


       axios('https://api.spotify.com/v1/me', {
        'method': 'GET',
        'headers': { 
           'Content-Type': 'application/json',
           'Authorization' : 'Bearer ' + tokenresponse.data.access_token
        }
      })
      .then (response => {      
        console.log(response)  
  
        setUser({
          username: response.data.display_name,
          follower_count: response.data.followers.total,
          image_url: response.data.images[0].url,
          country: response.data.country
        })
      }).catch(error => console.log(error))

      /**axios('https://api.spotify.com/v1/me/tracks', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + spotify.token}
      })
      .then (res => {      
        //console.log(res)  
        setTracks(res.data.items)
        console.log(res.data.items)
        setTracksTotal(res.data.total)
        console.log(tracksTotal)
      });**/



  return (
    <div className="App">
      <h1 className='title'>Spotify API </h1>
      <div className='header'>
          <div><img src={user.image_url} alt="" /></div>
          <div>
            <h2>Username: { user.username}</h2>
            <p> Followers: { user.follower_count }</p>
            <p>Country: { user.country}</p>
          </div>
      </div>

      <div>
        <h2>Total tracks:</h2>
        <Tracks />
      </div>
   
    </div>
  );
}

export default App;
