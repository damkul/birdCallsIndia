const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get("/", (req,res) => {
    fs.readFile('public/prj.json','utf-8', (err,jsonString) => {
        if (err) {
            console.error();
        }
            console.log('json'+jsonString);
            const data = JSON.parse(jsonString);
            res.render("./projects/projects",{previousProjects:[],onGoingProjects:data,error:'',success:'',role:1})
        })
})

module.exports = router;