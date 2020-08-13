// Routes that handle all the settings page requests

const express = require('express');
const mongoose = require('mongoose');
const Tracker = mongoose.model("Tracker");

const router = express.Router();

router.post("/click", async (req, res)=>{
  try {
    let redirectUrl
    let tracker = await Tracker.findOne({
      url: req.body.url
    })
    let findClick = tracker.clicks.filter(clickFilter => {
      return clickFilter.userId === req.body.userId
    }).map(mapped=>{
      return mapped
    })
    if(!tracker.trackerOn){
      redirectUrl = tracker.redirect1
      let newId =  mongoose.Types.ObjectId()
      tracker.clicks.push({
        id: newId,
        sessionId: req.body.sessionId,
        userId: req.body.userId,
        url: req.body.url,
        redirect: tracker.redirect1,
        created_at: Date.now()
      })
    }
    else if(findClick[0]?.redirect){
      redirectUrl = findClick[0].redirect
      let newId =  mongoose.Types.ObjectId()
      tracker.clicks.push({
        id: newId,
        sessionId: req.body.sessionId,
        userId: req.body.userId,
        url: req.body.url,
        redirect: findClick[0].redirect,
        created_at: Date.now()
      })
    }
    else {
      if( Math.floor(Math.random() * 2) === 0){
        redirectUrl = tracker.redirect1
        let newId =  mongoose.Types.ObjectId()
        tracker.clicks.push({
          id: newId,
          sessionId: req.body.sessionId,
          userId: req.body.userId,
          url: req.body.url,
          redirect: tracker.redirect1,
          created_at: Date.now()
        })
      }
      else {
        redirectUrl = tracker.redirect2
        let newId =  mongoose.Types.ObjectId()
        tracker.clicks.push({
          id: newId,
          sessionId: req.body.sessionId,
          userId: req.body.userId,
          url: req.body.url,
          redirect: tracker.redirect2,
          created_at: Date.now()
        })
      }
    }

    await tracker.save()
    res.status(200).send(redirectUrl)
  }
  catch(err){
    console.log(err)
  }
})

router.get('/getTrackers', async (req, res)=>{
  try {
    const trackers = await Tracker.find();
    res.send(trackers)
  }

  catch (err) {
    res.status(422).send({ error: "The trackers were not retrieved properly."})
  }
})

router.post('/addTracker', async (req, res)=>{
  const { url,redirect1,redirect2 } = req.body
  try {
    Tracker.create({
      url,
      redirect1,
      redirect2,
    })
    res.status(200).send("tracker added")
  }

  catch (err) {
    res.status(422).send({ error: "The user info did not update properly."})
  }
})

router.post('/addConversion', async (req, res)=>{
  const { landing, campaign, userId, sessionId} = req.body
  try {
    let tracker = await Tracker.findOne({
      url: landing
    })
    let sessionfilter = tracker.conversions.filter(filterItem=>{
      return filterItem.sessionId === sessionId
    }).map(mapped=>{
      return mapped
    })
    if(sessionfilter.length === 0){
      let newId =  mongoose.Types.ObjectId()
      tracker.conversions.push({
        id: newId,
        sessionId,
        userId,
        campaign,
        landing,
        created_at: Date.now()
      })
      await tracker.save()
    }
    res.status(200).end()
  }
  catch(err){
    console.log(err)
  }
})

router.post("/toggleCampaign", async (req, res)=>{
  const { trackerId } = req.body
  try {
    let tracker = await Tracker.findOne(
      {_id: trackerId}
    )
    if(tracker.trackerOn){
      tracker.trackerOn = false
    }
    else {
      tracker.trackerOn = true
    }
    await tracker.save()
    res.status(200).send(tracker)
  }

  catch (err) {
    res.status(422).send({ error: "campaign did not update properly."})
  }
})

module.exports = router;