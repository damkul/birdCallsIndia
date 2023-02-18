const express = require('express');
const router = express.Router();
const fs = require('fs');
router.use(express.json());


//get the user data from json file
const getBlogData = () => {
    const jsonData = fs.readFileSync('public/blogs.json')
    return JSON.parse(jsonData)    
}

//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('public/blogs.json', stringifyData)
}

router.get('/', (req,res) => {

    //read data from json file
   var blogs = getBlogData();
   res.render('./blogs/blog',{blogList:blogs,error:'',success:'',role:0});
});

router.get('/writeNewBlog',(req,res) =>{
    res.render('./blogs/newBlog',{error:'',success:''});
   
 });

 router.post('/newBlog',async(req,res) => {
    var data = req.body;
    var blog = {
        "blogId":'4',
        "blogName": data.blogName,
        "blogContent": data.blogContent,
        "date":data.date,
        "image":data.image
    };
    const existingBlogs = getBlogData();
    existingBlogs.push(blog);
    saveUserData(existingBlogs);
    res.redirect('./writeNewBlog')
 })

 router.get('/readBlog/:id',(req,res) =>{
        var blogId = req.params.id;
        const blogs = getBlogData();
        const findExist = blogs.find( blog => blog.blogId === blogId )
        if (findExist) {
            res.render('blogs/readBlog',{title:"blogs",blog:findExist})
        }
   })
   router.get('/editBlog/:id',(req,res) => {
        var blogId = req.params.id;
        const blogs = getBlogData();
        const findExist = blogs.find( blog => blog.blogId === blogId )
        if (findExist) {
            res.render('blogs/editBlog',{title:"blogs",blog:findExist,success:"",error:""})
        }
  })

   router.post('/editBlog', (req,res) => {
        var bg = req.body;
        console.log(bg);
        const blogs = getBlogData();
        const findExist = blogs.find( blog => blog.blogId === bg.blogId );
        if (!findExist) {
            return res.status(409).send({error: true, msg: 'username not exist'})
        }
        const updateblog = blogs.filter( blog => blog.blogId !== bg.blogId )
        //push the updated data
        updateblog.push(bg)
        //finally save it
        saveUserData(updateblog);
        res.redirect('/blogs/editblog/'+bg.blogId)
   });

   router.delete('/deleteBlog/:id', (req, res) => {
    const id = req.params.id
    //get the existing userdata
    const existBlogs = getBlogData()
    //filter the userdata to remove it
    const filterBlogs = existBlogs.filter( blog => blog.blogId !== id )
    if ( existBlogs.length === filterBlogs.length ) {
        return res.status(409).send({error: true, msg: 'username does not exist'})
    }
    //save the filtered data
    saveUserData(filterBlogs)
   res.redirect('/blogs')
    
})


module.exports = router;