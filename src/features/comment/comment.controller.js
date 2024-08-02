import CommentRepository from "./comment.repository.js";



export class CommentController {
    constructor() {
        this.commentRepository = new CommentRepository();
    }

    async createComment(req, res) {
        const userId = req.userID;
        const postId = req.params.postId;
        const comment = req.body.comment;  
        console.log("CREATECOMMENT "+userId+' '+postId+' '+comment)
        try {
            const commentCreate = await this.commentRepository.createNewComment(postId, userId, comment);
            res.status(201).send(`Comment created Successfully \n ${commentCreate}`);
        } catch(err) {
            console.log(err);
            res.status(404).send(err);
        }
    }

    async getComment(req, res) {
        const postId = req.params.postId;
        const comment = await this.commentRepository.getCommentForPost(postId);
        res.status(200).send(comment);
        // userid removed for privay reasons
        //const {user, ...commentWithoutUserId} = comment._doc
    }

    async deleteComment(req, res) {
        const commentId = req.params.commentId;
        const userId = req.userID;
        const deletedComment = await this.commentRepository.deleteAComment(commentId, userId);
        if(!deletedComment) {
            res.send(404).send('It seems you are not authorised to delete the comment');
        }
        res.status(200).send(`Comment Deleted Successult \n ${deletedComment}`); 
    }

    async updateComment(req, res) {
        const commentId = req.params.commentId;
        const userId = req.userID;
        const commentText = req.body.comment;
        const updatedComment = await this.commentRepository.updateAComment(commentId, userId, commentText);
        console.log(updatedComment);
        if(!updatedComment) {
            res.status(404).send('Seems unauthorised access');
        }
        res.status(201).send(`This is the updated comment ${updatedComment}`)
    }
}