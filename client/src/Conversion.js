import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';


function Conversion () {
  useEffect(()=>{
    //script start
    let userId = localStorage.getItem("cri_genetics_userId")
    let campaign = localStorage.getItem("cri_genetics_campaign")
    let sessionId = sessionStorage.getItem("cri_genetics_sessionId")
    let landing = localStorage.getItem("cri_genetics_landing")

    if(userId){
      axios.post('/addConversion', {landing, campaign, userId, sessionId})
    }
    //script end
  }, [])

  return (
    <div>
      Thank you for buying WidgetA!
    </div>
  )
}

export default Conversion;