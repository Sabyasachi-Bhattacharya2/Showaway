import FriendshipRepository from "./friend.repository.js";



export class FriendController {
    constructor() {
        this.friendRepository = new FriendshipRepository();
    }

    async getFriends(req, res) {
        const userId = req.params.userId;
        const friendList = await this.friendRepository.getUsersFriends(userId);
        res.status(200).send(friendList);
    }

    async getPendingRequests(req, res) {
        const userId = req.userID;
        const pendingFriendList = await this.friendRepository.getPendingUserRequests(userId);
        res.status(200).send(pendingFriendList);
    }

    async toggleFriendship(req, res) {
        const userId = req.userID;
        const friendId = req.params.friendId;
        const friendRequestStatus = await this.friendRepository.toggleUserFriendShip(userId, friendId);
        res.status(200).send(friendRequestStatus);
    }

    async acceptanceFriendship(req, res) {
        const friendId = req.params.friendId;
        const acceptance = req.body.acceptance;
        const userId = req.userID;
        const status = await this.friendRepository.acceptanceUserFriendRequest(friendId, acceptance, userId);
        
        res.status(200).send(status); 
    }
}