import mongoose from "mongoose"
import { friendListArray, friendSchema } from "./friend.schema.js"


const FriendModel = mongoose.model('Friend', friendSchema);
const FrindListArrayModel = mongoose.model('FriendListArray', friendListArray);

export default class FriendshipRepository {
    async getUsersFriends(userId) {
        const friends = await FriendModel.findOne({user: userId});
        const listOfFriends = await friends.friendList.filter(item => 
            item.acceptanceStatus == true
        );
        return listOfFriends;
    }

    async getPendingUserRequests(userId) {
        const friends = await FriendModel.findOne({user: userId});
        const listOfPendingFriendRequest = await friends.friendList.filter(item => 
            item.acceptanceStatus == false
        );
        return listOfPendingFriendRequest;
    }

    async toggleUserFriendShip(userId, friendUserId) {
        const userObjectId  = (userId);
        
        const friendObjectId  = new mongoose.Types.ObjectId(friendUserId)
        console.log(userId+'   '+friendObjectId);
        const friends = await FriendModel.findOne({user: userObjectId});
        console.log(friends);
        if(!friends) {
            const newFriend = {
                user: friendObjectId,
                acceptanceStatus: false
            };
            
            const firstFriend = new FriendModel({
                user: userObjectId,
                friendList: [newFriend]
            });
            await firstFriend.save(); 
            return;
        }
        
        const friendInListIndex = friends.friendList.findIndex(item => item.user.toString() == friendUserId.toString());
        console.log(friendInListIndex);
        if(friendInListIndex != -1) {
            friends.friendList.splice(friendInListIndex, 1);
            await friends.save();
            return "Friend Request Removed";
        } else {
            friends.friendList.push({
                user: friendObjectId,
                acceptanceStatus: false
            });
            await friends.save();
            return "Friend Request Added";
        }
        
    }

    async acceptanceUserFriendRequest(friendId, acceptance, userId) {
        console.log(`tESTER ${userId} ${acceptance}`);
        const friend = await FriendModel.findOne({user: userId});
        console.log(friend);
        const friendFate = await friend.friendList.findIndex(item => item.user.toString() == friendId);
        let msg = "Accepted";
        if(acceptance != 'false') {
            friend.friendList[friendFate].acceptanceStatus = true;
        } else {
            friend.friendList.splice(friendFate, 1);
            msg = "Rejected";
        }
        await friend.save();
        return msg;
    }

}