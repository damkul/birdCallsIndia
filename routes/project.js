const express = require('express');
const router = express.Router();
const fs = require('fs');
router.use(express.json());

//get the user data from json file
const getProjectData = () => {
    const jsonData = fs.readFileSync('public/prj.json')
    return JSON.parse(jsonData)    
}

//read the user data from json file
const saveProjectData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('public/prj.json', stringifyData)
}

router.get("/", (req,res) => {
    var projects= getProjectData()
    res.render("./projects/projects",{previousProjects:[],onGoingProjects:projects,error:'',success:'',role:0})
});

router.get('/newProject',(req,res) => {
    res.render("./projects/newProject",{error:'',success:''});
  });
router.post('/createNewProject',(req,res) => {
    var project = req.body;
    var newPrj = {
        "projectId":5,
        "projectName":project.projectName,
        "description":project.description,
        "fromDate":"2023-02-23",
        "toDate":"2023-02-25",
        "projectInstructions":"Bring your tiffin"
    }
    const existingProject = getProjectData();
    existingProject.push(newPrj);
    saveProjectData(existingProject);
    res.redirect('./newProject')
});

module.exports = router;