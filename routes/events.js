const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/',(req,res) => {
    fs.readFile('public/events.json','utf-8', (err,jsonString) => {
        if (err) {
            console.error();
        }
            console.log('json'+jsonString);
            const data = JSON.parse(jsonString);
            res.render('events/event',{title:"Event",action:'list',eventList:data,doneEvents:[],error:'',success:'',role:1});
        })
})



module.exports = router;