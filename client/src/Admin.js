import React, { useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'

function Admin(props) {
  
  const [trackers, setTrackers] = useState([])

  const [newUrl, setNewUrl] = useState("")
  const [newRedirect1, setNewRedirect1] = useState("")
  const [newRedirect2, setNewRedirect2] = useState("")
  const [reloadData, setReloadData] = useState(false)
  const [userId, setUserId] = useState("")

  const [timer, setTimer] = useState("")



  useEffect(()=>{
    setUserId(localStorage.getItem("cri_genetics_userId"))
    axios.get("/getTrackers").then(data=>{
      setTrackers(data.data)
    })
    setTimer(setInterval(()=>{
      setReloadData(true)
    }, 5000))
  }, [])

  useEffect(()=>{
    return ()=>{
      clearInterval(timer)
    }
  }, [timer])

  useEffect(()=>{
    if(reloadData){
      axios.get("/getTrackers").then(data=>{
        setTrackers(data.data)
        setReloadData(false)
      })
    }
  }, [reloadData])

  const handleNewTracker = () => {
    axios.post("/addTracker", {url: newUrl, redirect1:newRedirect1, redirect2:newRedirect2}).then(data=>{
      if(data.data === "tracker added")
      setReloadData(true)
      setNewUrl("")
      setNewRedirect1("")
      setNewRedirect2("")
    })
  }

  const handleUnique =  (trackerId, redirectRoute, userId) => {
    if(trackers) {
      let temp = trackers.filter(filtered=>{
        return filtered.clicks.length > 0
      }).filter(innerFilter=>{
        return trackerId === innerFilter._id
      }).map(mapped=>{
        let inner = mapped.clicks.filter(filterItem => {
          return filterItem.redirect === redirectRoute
        })
        return inner
      })
      if(!temp[0] || temp[0].length === 0){
        return 0
      }
      else {
        let uniqueCount = []
        for (let i = 0; i < temp[0].length; i++) {
          if(uniqueCount.indexOf(temp[0][i].userId) === -1){
            uniqueCount.push(temp[0][i].userId)
          }
        }
        return uniqueCount.length
      }
    }
  }

  const handleCampaignToggle = (trackerId) => {
    axios.post("/toggleCampaign", {trackerId}).then(response=>{
      axios.get("/getTrackers").then(data=>{
        setTrackers(data.data)
      })
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={'https://www.crigenetics.com/hubfs/html/ancestry/images/dna-logo.png'} className="App-logo" alt="logo" />
      </header>
      <div className="tracker-container">
        {
          trackers.map(tracker=>{
            return (
              <div key={tracker._id} className="tracker">
                <div className="routes">
                  <div>URL:</div>{tracker.url} - <button onClick={()=>handleCampaignToggle(tracker._id)}>{tracker.trackerOn ? "ON" : "OFF"}</button>
                </div>
                <div className="routes">
                  <div>Redirect 1:</div>{tracker.redirect1}
                </div>
                <div className="stats">
                  <div>
                    Unique:{handleUnique(tracker._id, tracker.redirect1, userId)}
                  </div>
                  <div>
                    Total: {tracker.clicks.filter(filterItem => {
                      return filterItem.redirect === tracker.redirect1
                    }).map(mapped=>{
                      return mapped
                    }).length}
                  </div>
                  <div>
                    Conversions: {tracker.conversions.filter(filterItem=>{
                      return filterItem.campaign === tracker.redirect1
                    }).map(mapped=>{
                      return mapped
                    }).length}
                  </div>
                </div>
                <div className="routes">
                  <div>Redirect 2:</div>{tracker.redirect2}
                </div>
                <div className="stats">
                  <div>
                    Unique: {handleUnique(tracker._id, tracker.redirect2)}
                  </div>
                  <div>
                    Total: {tracker.clicks.filter(filterItem => {
                      return filterItem.redirect === tracker.redirect2
                    }).map(mapped=>{
                      return mapped
                    }).length}
                  </div>
                  <div>
                    Conversions: {tracker.conversions.filter(filterItem=>{
                      return filterItem.campaign === tracker.redirect2
                    }).map(mapped=>{
                      return mapped
                    }).length}
                  </div>
                </div>
              </div>
            )
          })
        }
        <div className="add-tracker">
          <div className="routes">
            <div>URL:</div> <input value={newUrl} onChange={(event)=>{setNewUrl(event.target.value)}}/>
          </div>
          <div className="routes">
            <div>Redirect 1:</div> <input value={newRedirect1} onChange={(event)=>{setNewRedirect1(event.target.value)}}/>
          </div>
          <div className="routes">
            <div>Redirect 2:</div> <input value={newRedirect2} onChange={(event)=>{setNewRedirect2(event.target.value)}}/>
          </div>
          <button onClick={handleNewTracker} style={{alignSelf: "center"}}>Add New Tracker</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
