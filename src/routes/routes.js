const router = require("express").Router();
const Rmodel = require("../models/register")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Bmodel = require("../models/books");
const dotenv = require("dotenv").config();

const secret = process.env.SECRET_KEY

const varifyuser = async(req,res,next)=>{
    try {
        const token = req.headers["authorization"];
        if(!token){
            return res.json({
                status:"session expired"
            })
        }
        const user = jwt.verify(token,secret);
        if(user){
            next();
        }

    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
}


router.post("/signup", async(req,res)=>{
    const {username,password} = req.body
    try {
        const userExist = await Rmodel.findOne({username:username})
        if(userExist){
            return res.json({
                status:"user already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const user = await Rmodel.create({
            username:username,
            password:hash
        })
        res.json({
            status:"successfull",
            user
        })

    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    try {
        if(!username && !password){
            res.json({
                status:"Please enter all details"
            })
        }
        const user = await Rmodel.findOne({username:username});
        const hash = await bcrypt.compare(password,user.password)
        if(hash == true){
            const token = jwt.sign({user},secret)
            res.json({
                status:"successfull",
                username:user.username,
                token,
                hash
            })
        } else {
            res.json({
                status:"Invalid data"
            })
        }

    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.get("/getbooks/:username", varifyuser,async(req,res)=>{
    const {username} = req.params;
    try {
        const books = await Bmodel.find({username:username})
        if(books.length === 0){
            return res.json({
                status:"You don't have any books, please add some.."
            })
        } else {
            return res.json({
                status:"successfull",
                books
            })
        }

    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.post("/addbooks", varifyuser,async(req,res)=>{
    const {username, title, author, description, publishedDate, publisher,genre} = req.body
    try {
        if(!username && !title && !author && !description && !publishedDate && !publisher){
            return res.json({
                status:"please enter all the details"
            })
        } else {
            const newbook = await Bmodel.create({
                username:username,
                title:title,
                author:author,
                description:description,
                publishedDate:publishedDate,
                publisher:publisher,
                genre:genre
            })
            res.json({
                status:"successfull",
                newbook
            })

        }
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.put("/editbook", varifyuser,async(req,res)=>{
    const {username, title, author, description, publishedDate, publisher,genre} = req.body
    try {
        if(!username && !title && !author && !description && !publishedDate && !publisher){
            return res.json({
                status:"please enter all the details"
            })
        } else {
            const newbook = await Bmodel.updateOne({username:username},{
                username:username,
                title:title,
                author:author,
                description:description,
                publishedDate:publishedDate,
                publisher:publisher,
                genre:genre
            })
            res.json({
                status:"successfull",
                newbook
            })
        }
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.delete("/deletebook/:id", varifyuser, async(req,res)=>{
    const {id} = req.params
    try {
        const result = await Bmodel.deleteOne({_id:id})
        res.json({
            status:"successfull",
            result
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

module.exports = router;
