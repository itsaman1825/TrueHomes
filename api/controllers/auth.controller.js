import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const controller = async(req,res,next) => {
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username, email, password : hashedPassword});

    try {
        await newUser.save()

        res.send("use created successfully")
    } catch (error) {
        next(error)
    }
    // console.log(req.body)
}