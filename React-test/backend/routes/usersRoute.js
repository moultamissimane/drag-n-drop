const router = require('express').Router();
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddlewares = require('../middlewares/authMiddlewares');

//register new user
router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email }); //check if user already exists  
        if (existingUser) { //  if user exists, return error    
            return res.status({
                message: 'An account with this email already exists.',
                success: false,
                data: null,

            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);        //hash password before saving to db 
        req.body.password = hashedPassword; //replace password with hashed password 
        const newUser = new User(req.body)
        await newUser.save();
        res.send({
            message: 'User created successfully.',
            success: true,
            data: null,
        });
    }
    catch (error) {  //catch any errors
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }

});
//login user
router.post('/login', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {
            return res.send({
                message: 'User does not exist.',
                success: false,
                data: null,
            });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, userExists.password);
        if (!passwordMatch) {
            return res.send({
                message: 'Incorrect password.',
                success: false,
                data: null,
            });
        }
        const token = jwt.sign({ userId: userExists._id }, process.env.jwt_secret, { expiresIn: "1h" });

        res.send({
            message: 'User logged in successfully.',
            success: true,
            data: token,
        });
    }
    catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }
});

//get user by id 
router.post("/get-user-by-id", authMiddlewares, async (req, res) => {  //authMiddlewares is a middleware function that checks if the user is logged in
    try {
        const user = await User.findById(req.body.userId);  //find user by id
        res.send({
            message: 'User fetched successfully.',
            success: true,
            data: user,
        });
    } catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })

    }
});

//get all users
router.get("/get-all-users", authMiddlewares, async (req, res) => {
    try {
        const users = await User.find();  //find all users
        res.send({
            message: 'Users fetched successfully.',
            success: true,
            data: users,
        });
    } catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }
});


//update user
router.post("/update-user", authMiddlewares, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);  //find user by id
        if (req.body.name) {  //if name is provided, update name
            user.name = req.body.name;
        }
        if (req.body.email) {  //if email is provided, update email
            user.email = req.body.email;
        }
        if (req.body.password) {  //if password is provided, update password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
        }
        await user.save();  //save updated user 
        res.send({
            message: 'User updated successfully.',
            success: true,
            data: null,
        });
    } catch (error) {
        res.send({
            message: 'An error occurred.',
            success: false,
            data: null,
        })
    }
});


module.exports = router;