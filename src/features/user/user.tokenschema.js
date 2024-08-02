import mongoose from "mongoose"


export const tokenSchema = new mongoose.Schema({
    email: String,
    token: String
});