import LikeRepository from "./like.repository.js";


export class LikeController{
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    async getLikes(req, res) {
        const id = req.params.id;
        const type = req.query.type;
        
        const numberOfLike = await this.likeRepository.getAllLikes(id, type);
        console.log(`THE LIKE API ${id} AND ${type} AND ${numberOfLike}`);
        if(!numberOfLike) {
            return res.status(201).send("0");
        }
        res.status(200).send(numberOfLike);
    }

    async toogleLike(req, res) {
        const id = req.params.id;
        const type = req.query.type;
        const userId = req.userID;
        console.log(`INSIDE CONTROLLER LIKETOGGLER ${id} ${type} ${userId}`);
        const updatedLike = await this.likeRepository.toggleALike(id, type, userId);
        res.status(201).send(updatedLike);
    }
}