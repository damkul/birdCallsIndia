const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req,res) => {

    //read data from json file
   
    fs.readFile('public/blogs.json','utf-8', (err,jsonString) => {
    if (err) {
        console.error();
    }
        console.log('json'+jsonString);
        const data = JSON.parse(jsonString);
        res.render('./blogs/blog',{blogList:data.blogs,error:'',success:'',role:1});
    })

});

router.get('/writeNewBlog',(req,res) =>{
    res.render('./blogs/newBlog',{error:'',success:''});
   
 });

 router.post('/newBlog',async(req,res) => {
    var data = req.body;
    var blog = {
        "blogId":'2',
        "blogName": data.blogName,
        "blogContent": data.blogContent,
        "date":data.date,
        "image":data.image
    };fs.readFile('public/blogs.json','utf-8', (err,jsonString) => {
        if (err) {
            console.error();
        }
            const data = JSON.parse(jsonString);
            fs.writeFile('public/blogs.json',JSON.stringify(data.blogs), (err) => {
                if (err) throw err; 
                res.redirect("/blogs/writeNewBlog")
            })
        })
   
 })

 router.get('/readBlog/:id',(req,res) =>{
    fs.readFile('public/blogs.json','utf-8', (err,jsonString) => {
        if (err) {
            console.error();
        }
            console.log('json'+jsonString);
            const data = JSON.parse(jsonString);
            data.blogs.filter({blogId:1})
            res.render('./blogs/blog',{blogList:data.blogs,error:'',success:'',role:1});
        })
   })



module.exports = router;