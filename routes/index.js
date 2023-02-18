const express = require('express');
const router = express.Router();
const fs = require('fs');
router.use(express.json());


const getData = (filename) => {
    const jsonData = fs.readFileSync(filename)
    return JSON.parse(jsonData)    
}
router.get('/',(req,res) => {
    var oData = getData("public/observations.json");
    var edata = getData("public/events.json")
    var bdata = getData("public/blogs.json")
    var pdata = getData("public/prj.json")
    var sData = getData("public/sponsership.json")
    res.render('index',{eventList:edata,blogList:bdata,projectList:pdata,obsList:oData,spnList:sData})
 });

router.get('/aboutUs',(req,res)=>{
    console.log(req.query)
    res.render('../views/aboutUs/aboutUs')
})
module.exports = router;