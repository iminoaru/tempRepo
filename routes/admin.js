const { Router, json} = require("express");
const adminMiddleware = require("../middleware/admin");
const zod = require('zod')
const {Admin, Course , User} = require("../db");
const router = Router();


router.use(json());


// Admin Routes

router.post('/signup', (req, res) => {
    const username = req.body.username
    const pass = req.body.password

    const verifiedUserName = zod.string().email().safeParse(username)
    const verifiedPass = zod.string().safeParse(pass)

    if(!verifiedUserName.success || !verifiedPass.success){
        res.status(401).json({message: 'Invalid Email or Password'})
    } else {
        const newAdmin = new Admin({username : req.body.username, pass : req.body.password})
        newAdmin.save().then(() => res.json({message: 'Admin created and added to db'}))
    }
});

router.post('/courses', adminMiddleware, (req, res) => {


    const newCourse = new Course({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink
    })
   newCourse.save().then(() => `added ${req.body.title} course to db`)
});

router.get('/courses', adminMiddleware, (req, res) => {
    Course.find().then((courses) => res.json(courses))
});

module.exports = router;