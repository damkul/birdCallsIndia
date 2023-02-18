const express = require('express');
const router = express.Router();
const fs = require('fs');
router.use(express.json());

//get the user data from json file
const getSponsershipData = () => {
    const jsonData = fs.readFileSync('public/sponsership.json')
    return JSON.parse(jsonData)    
}

//read the user data from json file
const saveSponsershipData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('public/sponsership.json', stringifyData)
}

router.get("/", (req,res) => {
    var data = getSponsershipData()
    res.render('./sponsership/sponsership',{title:"Sponsership",action:'list',advList:data,success:'',error:'',role:0});
});

router.get('/newSponsership',(req,res) => {
    res.render('./sponsership/newSponsership',{error:'',success:''})
})

router.post('/new',(req,res) => {
    var adv = req.body;
    var newSponsership ={
        "advId":5,
        "advName":adv.advName,
        "imageName":adv.image,
        "fromDate":"2023-02-23",
        "toDate":"2023-02-25",
        "websiteLink":"abc"
    }
    const existingSposerships = getObsData();
    existingSposerships.push(newSponsership);
    saveObsData(existingSposerships);
    res.redirect('./newSponsership')
});

module.exports = router;