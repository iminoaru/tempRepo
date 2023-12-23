const { Router, json} = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require("zod");
const {Admin, User} = require("../db");


router.use(json());


// User Routes
router.post('/signup', (req, res) => {
    const userName = req.body.name
    const pass = req.body.pass

    const verifiedUserName = zod.string().email().safeParse(userName)
    const verifiedPass = zod.string().safeParse(pass)

    if(verifiedUserName.success && verifiedPass.success){
        const newUser = new User({userName : userName, pass : pass})
        newUser.save().then(() => res.json({message: 'User created and added to db'}))
    } else {
        res.status(401).send('Invalid Email or Password')
    }
});

router.get('/courses', (req, res) => {
    Course.find().then((courses) => res.send(courses))
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    Course.findOne({id : req.params.id}).then((thatCourse) => res.send(thatCourse))
        .catch(res.send('course not found'))
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router