const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get("/", (req,res) => {
    // fs.readFile('public/sponsership.json','utf-8', (err,jsonString) => {
    //     if (err) {
    //         console.error();
    //     }
    //         console.log('json'+jsonString);
    //         const data = JSON.parse(jsonString);
    //         res.render('./sponsership/sponsership',{title:"Sponsership",action:'list',advList:data,success:'',error:'',role:1});
    //     })
    res.render('memberships/memberships',{members:[]});
})

module.exports = router;