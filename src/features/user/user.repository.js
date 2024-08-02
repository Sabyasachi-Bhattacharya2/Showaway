import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { tokenSchema } from "./user.tokenschema.js";


export const UserModel = mongoose.model('User', userSchema);
export const TokenBlackListModel = mongoose.model('blacklistedtoken', tokenSchema);

export default class UserRepository {
    async signup(user) {
        const newUser = new UserModel(user);
        await newUser.save();
        return user;
    }

    async signin(email, password) {
        const loggedUser = await UserModel.findOne({email});
        console.log("Logged user " + loggedUser);
        if(loggedUser) {
            try {
            const loggedPass = loggedUser.hashedPassword;
            console.log("Hashed password inside database "+loggedPass);
            const checkPassword = await bcrypt.compare(password, loggedPass);
            console.log(`Password before hashing ${password}`);
            console.log(await bcrypt.hash(password, 12));
            console.log(`Password checking result ${checkPassword} Function argument pass after hashing ${password}`);
            if(checkPassword) {
                    const token = jwt.sign(
                        {
                            userID: loggedUser._id,
                            email: loggedUser.email
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '2h'
                        }
                    )
                
                    console.log(token);
                    return token;
                } else {

                    return "Invalid Credentials";
                } 
            }catch(err) {
                console.log(err)
            }
        } else {
            return "Enter Correct email";
        }
        
    } 

    async userLoggedOut(token) {
        console.log(token);
        const newToken = new TokenBlackListModel({email:'dummy', token: token});
        await newToken.save();
    }
    async getUserDetails(userId) {
        const user = await UserModel.findById(userId);
        return user;
    }

    async getAllUserDetails() {
        const user = await UserModel.find();
        return user;
    }
    
}