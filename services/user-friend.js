import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import getErrorJson from "./error.js";

async function deleteUser(username) {
    const user = await User.findById(username);
    if (!user)
        return getErrorJson(404, ["User not found"]);

    await removeFromAllFriends(username);
    await removeAllPosts(username);
    await removeAllComments(username);
    await removeAllLikes(username);

    return await User.findByIdAndDelete(username);
}

async function removeFriend(username1, username2) {
    const usersExists = await checkIfUsersExist(username1, username2);
    if (usersExists)
        return usersExists;

    const user1 = await User.findById(username1);
    const user2 = await User.findById(username2);


    if (!user1.friends.includes(user2))
        return getErrorJson(400, ["Users are not friends"]);
    
    const updatedUser1 = await User.findByIdAndUpdate(username1, {
        $pull: {
            friends: username2
        }
    });

    const updatedUser2 = await User.findByIdAndUpdate(username2, {
        $pull: {
            friends: username1
        }
    });

    return {
        user1: updatedUser1,
        user2: updatedUser2
    };
}

async function getUserFriends(username, requestedUsername) {
    if (username === requestedUsername)
        return (await User.findById(username)).friends;

    const userExists = await checkIfUserExists(requestedUsername);
    if (userExists)
        return userExists;

    const requestedUser = await User.findOne({
        _id: requestedUsername,
        friends: username
    });

    if (!requestedUser)
        return getErrorJson(403, ["Forbidden access to [" + requestedUsername + "]'s friends list"]);
    
    return {friends: requestedUser.friends};
}

async function sendFriendRequest(senderUsername, recieverUsername) {
    if (senderUsername === recieverUsername)
        return getErrorJson(400, ["user can't send friend request to themselves"]);

    if (await checkIfFriends(senderUsername, recieverUsername))
        return getErrorJson(409, ["Users are already friends"]);
    
    if (await checkFriendRequest(senderUsername, recieverUsername))
        return getErrorJson(400, ["[" + recieverUsername + "] already has a friend request from [" + sendFriendRequest + "]"]);

    if (await checkFriendRequest(recieverUsername, senderUsername))
        return await acceptRequest(recieverUsername, senderUsername);

    await User.findByIdAndUpdate(recieverUsername, {
        $push: {
            friendReq: senderUsername
        }
    });

    return await User.findById(senderUsername);
}

async function acceptRequest(senderUsername, recieverUsername) {
    if (!(await checkFriendRequest(senderUsername, recieverUsername)))
        return getErrorJson(400, ["user [" + recieverUsername + "] doesn't have a friend request from user [" + senderUsername + "]"]);
    
    return await addFriends(senderUsername, recieverUsername);
}

//----------------------------------------------------------------------

async function removeFromAllFriends(username) {
    await User.updateMany({}, {
        $pull: {
            friends: username
        }
    });
}

async function removeAllPosts(username) {
    await Post.deleteMany({
        uploader: username
    });
}

async function removeAllComments(username) {
    await Comment.deleteMany({
        uploader: username
    });
}

async function removeAllLikes(username) {
    await Post.updateMany({}, {
        $pull: {
            likes: username
        }
    });

    await Comment.updateMany({}, {
        $pull: {
            likes: username
        }
    });
}

async function checkFriendRequest(senderUsername, recieverUsername) {
    return (await User.findById(recieverUsername)).friends.includes(senderUsername);
}

async function addFriends(username1, username2) {
    const usersExists = await checkIfUsersExist(username1, username2);
    if (usersExists)
        return usersExists;

    const user1 = await User.findById(username1);
    const user2 = await User.findById(username2);

    if (user1.friends.includes(user2))
        return getErrorJson(400, ["Users are friends already"]);

    const updatedUser1 = await User.findByIdAndUpdate(user1,{
        $push: {
            friends: user2
        }
    });

    const updatedUser2 = await User.findByIdAndUpdate(user2,{
        $push: {
            friends: user1
        }
    });

    return {
        user1: updatedUser1,
        user2: updatedUser2
    };
}

async function checkIfUsersExist(username1, username2) {
    const user1Exists = await checkIfUserExists(username1);
    if (user1Exists)
        return user1Exists;

    const user2Exists = await checkIfUserExists(username2);
    if (user2Exists)
        return user2Exists;
}

async function checkIfUserExists(username) {
    const user = await User.findById(username);

    if (!user)
        return getErrorJson(404, ["User [" + username + "] not found"]);
}

async function checkIfFriends(username1, username2) {
    return (await User.findById(username1)).friends.includes(username2);
}

export default {deleteUser, removeFriend, getUserFriends, sendFriendRequest, acceptRequest};