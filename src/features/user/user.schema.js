import mongoose, {Schema} from "mongoose";

export const userSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name is required"],
        maxLength: [25, "Name cant be greater than 25 characters"]
    },

    hashedPassword: String,

    email: {type: String, unique: true, require: true},

    gender: {
        type: String,
        enum: ['M', 'F', 'O'],
        require: true
    },
    
    age: Number
}); 