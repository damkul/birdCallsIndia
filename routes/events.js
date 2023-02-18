const express = require('express');
const router = express.Router();
const fs = require('fs');
router.use(express.json());

//get the user data from json file
const getEventData = () => {
    const jsonData = fs.readFileSync('public/events.json')
    return JSON.parse(jsonData)    
}

//read the user data from json file
const saveEventData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('public/events.json', stringifyData)
}


router.get('/',(req,res) => {
    var events = getEventData();
    res.render('events/event',{title:"Event",action:'list',eventList:events,doneEvents:[],error:'',success:'',role:0});
})

//get registration page
router.get('/newEvent',(req,res) => {
    res.render('./events/newEvent',{title:"Event",action:'list',error:'',success:''});
  });

  router.post('/new',(req,res) => {
    var data = req.body;
    var event = {
        "eventId":data.eventId,
        "eventName":data.eventName,
        "eventDescription":data.eventDescription,
        "image":"",
        "fee":300,
        "date":"2023-02-23",
        "eventType":"Seminar"
    };
    const existingEvents = getEventData();
    existingEvents.push(event);
    saveEventData(existingBlogs);
    res.redirect('./writeNewBlog')
}); 

module.exports = router;