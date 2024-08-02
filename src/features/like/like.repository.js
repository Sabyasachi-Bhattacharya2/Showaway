import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";


const LikeModel = mongoose.model('Like', likeSchema);

export default class LikeRepository {
    async getAllLikes(id, type) {
        const like = await LikeModel.find({
            likeable: id,
            on_model: type
        })
        .populate('User')
        .populate({
            path: 'likeable',
            model: type
        });
        console.log(`FOLLOW UP GET ALL LIKE ${like.likeCount}`);
        return like.likeCount;
    }

    async toggleALike(id, type, userID) {

        const likeAnItem = await LikeModel.findOne({likeable: id, user: userID, on_model: type}, {likeStatus: 1, likeCount: 1});
        if(!likeAnItem) {
            const newLike = await LikeModel.updateOne({
                likeable: id, on_model: type, user: userID
            }, {
                likeCount: 1,
                likeStatus: true
            },
        {upsert: true});
            return newLike;
        }
        likeAnItem.likeStatus = !likeAnItem.likeStatus;
        let incrementor = likeAnItem.likeStatus? 1: -1;
        let statusToggler = likeAnItem.likeStatus;
        
        const result = await LikeModel.updateOne(
            { likeable: id, on_model: type, user: userID },
            {
                $inc: {likeCount: incrementor},
                $set: {likeStatus: statusToggler}
            },
            { upsert: true }
        );

        return result;
    }
}