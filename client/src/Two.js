import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';


function Two () {
  useEffect(()=>{
    let userId = localStorage.getItem("cri_genetics_userId")
    if(!userId){
      userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("cri_genetics_userId", userId)
    }
    let sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.getItem("cri_genetics_sessionId", sessionId)
    localStorage.setItem("cri_genetics_landing", window.location.href)

    axios.post('/click', {url: window.location.href, userId, sessionId}).then(res=>{
      localStorage.setItem("cri_genetics_campaign", res.data)
      window.location.replace(res.data)
    })
  }, [])

  return (
    <div></div>
  )
}

export default Two;