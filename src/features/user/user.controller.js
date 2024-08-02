import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }
 
    async userSignup(req, res) {
        console.log(req.body.name);
        const {
            name, password, email, gender, age
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.userRepository.signup({
            name, hashedPassword, email, gender, age
        });
        res.status(201).send(user);
    }

    async userSignin(req, res) {
        const {password, email} = req.body;

        const loggedUser = await this.userRepository.signin(email, password);
        console.log(`Inside the user controller ${loggedUser}`);

        res.send(loggedUser);
    }

    async userLogout(req, res) {
        const user = req.userID;
        const token = req.headers['authorization'];
        await this.userRepository.userLoggedOut(token);
        res.status(200).send(`User: ${user} successfully logged out`);
    }

    async getDetails(req, res) {
        const userId = req.params.userId;
        const user = await this.userRepository.getUserDetails(userId);
        const {hashedPassword, ...userWithoutPass} = user._doc;
        res.status(201).send(userWithoutPass);
    }

    async getAllDetails(req, res) {
        const userArray = await this.userRepository.getAllUserDetails();
        let userArrayWithoutPass = [];
        userArray.forEach(user => {
            const {hashedPassword, ...userWithoutPass} = user._doc;
            userArrayWithoutPass.push(userWithoutPass);
        })
        res.status(201).send(userArrayWithoutPass);
    }
}