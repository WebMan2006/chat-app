import { Request, Response } from "express";
import User from "../models/user.model";
import argon2 from "argon2";

export const login = (req: Request, res: Response) => {
    console.log('loginUser');
}
export const signup = async (req: Request, res: Response) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({ error: "Password don't match"})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({ error: "Username already exists"})
        }

        //password hashing
        

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        await newUser.save();


        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
    } catch (e: any) {
        console.log("Error in signUp controller ", e.message)
        res.status(500).json({ e: "internal server error"})
    }
}
export const logout = (req: Request, res: Response) => {
    console.log('logoutUser');
}