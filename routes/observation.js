const express = require('express');
const router = express.Router();
const fs = require('fs');
router.use(express.json());

//get the user data from json file
const getObsData = () => {
    const jsonData = fs.readFileSync('public/observations.json')
    return JSON.parse(jsonData)    
}

//read the user data from json file
const saveObsData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('public/observations.json', stringifyData)
}

router.get("/", (req,res) => {
    var obs = getObsData()
    res.render('observations/observations',{title:"Observations",action:'list',obsList:obs,error:'',success:'',role:0});
})
router.get('/new',(req,res) => {
    res.render('observations/newObservation',{error:'',success:''});
});

router.post('/newObservation',(req,res) => {
        var obs = req.body;
        var newObs = {
            "obsId":5,
            "birdName":obs.birdName,
            "scientificName":obs.scientificName,
            "imageName":obs.imageName,
            "soundName":"",
            "date":"2023-02-23",
            "marathiName":""
        }
        const existingObs = getObsData();
        existingObs.push(newObs);
        saveObsData(existingObs);
        res.redirect('./new')
});

module.exports = router;