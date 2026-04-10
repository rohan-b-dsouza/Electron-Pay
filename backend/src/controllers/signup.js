import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import Account from "../models/Account.js";

export const signup = async (req, res)=> {
    const {email, username, password, firstName, lastName} = req.body;
    try {   
        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            return res.status(409).json({
                errors: {
                    email: "Email already exists"
                }
            });
        }   
        const existingUsername = await User.findOne({username});
        if (existingUsername) {
            return res.status(409).json({
                errors: {
                    username: "Username already taken"
                }
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, 
            username,
            password: hashedPassword,
            firstName,
            lastName
        })
        const userId = user._id;
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "1h"});
        const account = await Account.create({
            userId,
            balance: 1000000
        });
        return res.status(201).json({
            message: "User created successfully",
            token  
        })
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        }) ;
    }
}

