import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import getErrorJson from "./error.js";

/**
 * Removes a user from the database.
 * @param {String} username - User to delete's username
 * @returns :
 * On success - username
 * On failure - 
 *      404, "User not found" - If username doesn't exist in database
 */
async function deleteUser(username) {
    const user = await User.findById(username);
    if (!user)
        return getErrorJson(404, ["User not found"]);

    await removeFromAllFriends(username);
    await removeAllPosts(username);
    await removeAllComments(username);
    await removeAllLikes(username);

    await User.findByIdAndDelete(username);
    return username;
}

/**
 * Removes username1 and username2 from each other's friends list
 * @param {String} username1 First user's username
 * @param {String} username2 Second user's username
 * @returns :
 * On success - username1 and username2
 * On failure -
 *      404, "User [username] doesn't exist" - If one of the user's doesn't exist in the db
 *      400, "Users are not friends" - If the users are not friends
 */
async function removeFriend(username1, username2) {
    const usersExists = await checkIfUsersExist(username1, username2);
    if (usersExists)
        return usersExists;

    if (!(await User.findById(username1)).friends.includes(username2))
        return getErrorJson(400, ["Users are not friends"]);
    
    await User.findByIdAndUpdate(username1, {
        $pull: {
            friends: username2
        }
    });

    await User.findByIdAndUpdate(username2, {
        $pull: {
            friends: username1
        }
    });

    return ({
        username1: username1,
        username2: username2
    })
}

/**
 * Get the friends list of a user with username "requestedUsername", only if is friends with username
 * @param {String} username - Username of the user that requested the friends list
 * @param {String} requestedUsername - Username of the user which friends list requested
 * @returns :
 * On success - List of requestedUsername friends
 * On failure - 
 *      404, "User [requestedUsername] doesn't exist" - If requestedUsername doesn't exist in the db
 *      403, "Forbidden access" - If the users arn't friends
 */
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
        return getErrorJson(403, ["Forbidden access"]);
    
    return {friends: requestedUser.friends};
}

/**
 * Add senderUsername to recieverUsername's friendReq list, under listed constraints
 * @param {String} senderUsername - Username of user sending the request
 * @param {String} recieverUsername - Username of user reciving the request
 * @returns :
 * On success - senderUsername, recieverUsername
 * On failure -
 *      404, "User [username] doesn't exist" - If one of the user's doesn't exist in the db
 *      400, "User can't send friend request to themselves" - If username == recieverUsername
 *      409, "Users are already friends" - If the users are already friends
 *      400, "[recieverUsername] already has a friend request from [sendFriendRequest]" - If senderUsername has sent a friend request to recieverUsername already
 * Special success case - Add each other to friend lists if recieverUsername already sent a friend request to senderUsername
 */
async function sendFriendRequest(senderUsername, recieverUsername) {
    const usersExist = await checkIfUsersExist(senderUsername, recieverUsername);
    if (usersExist)
        return usersExist;

    if (senderUsername === recieverUsername)
        return getErrorJson(400, ["User can't send friend request to themselves"]);

    if (await checkIfFriends(senderUsername, recieverUsername))
        return getErrorJson(409, ["Users are already friends"]);
    
    if (await checkFriendRequest(senderUsername, recieverUsername))
        return getErrorJson(400, ["[" + recieverUsername + "] already has a friend request from [" + senderUsername + "]"]);

    if (await checkFriendRequest(recieverUsername, senderUsername))
        await acceptRequest(recieverUsername, senderUsername);
    else
        await User.findByIdAndUpdate(recieverUsername, {
            $push: {
                friendReq: senderUsername
            }
        });

    return ({
        sender: senderUsername,
        reciever: recieverUsername
    });
}

/**
 * recieverUsername accpets a friends request from senderUsername
 * @param {String} senderUsername - Username of friendReq sender
 * @param {String} recieverUsername - Username of friendReq reciever
 * @returns :
 * On success - senderUsername, recieverUsername
 * On failure -
 *      404, "User [username] doesn't exist" - If one of the user's doesn't exist in the db
 *      400, "user [recieverUsername] doesn't have a friend request from user [senderUsername]" - If recieverUsername doesn't have a friend request from senderUsername
 *      400, "Users are friends already" - If users are already friends
 */
async function acceptRequest(senderUsername, recieverUsername) {
    const usersExist = await checkIfUsersExist(senderUsername, recieverUsername);
    if (usersExist)
        return usersExist;
    
    const hasFriendRequest = await checkFriendRequest(senderUsername, recieverUsername)
    if (!hasFriendRequest)
        return getErrorJson(400, ["user [" + recieverUsername + "] doesn't have a friend request from user [" + senderUsername + "]"]);

    if ((await User.findById(senderUsername)).friends.includes(recieverUsername))
        return getErrorJson(400, ["Users are friends already"]);
    
    await removeFriendRequest(senderUsername, recieverUsername);
    await addFriends(senderUsername, recieverUsername);

    return {
        username1: senderUsername,
        username2: recieverUsername
    };
}

async function getFriendReqList(username) {
    const userExists = await checkIfUserExists(username);
    if (userExists)
        return userExists;

    const user = await User.findById(username)
    return user.friendReq;
}

export default {deleteUser, removeFriend, getUserFriends, sendFriendRequest, acceptRequest, getFriendReqList};

//---------------------------------------------------------------------------------------------------------
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
    const hasFriendRequest = (await User.findById(recieverUsername)).friendReq.includes(senderUsername);
    return hasFriendRequest;
}

async function addFriends(username1, username2) {
    await User.findByIdAndUpdate(username1,{
        $push: {
            friends: username2
        }
    });

    await User.findByIdAndUpdate(username2,{
        $push: {
            friends: username1
        }
    });
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

async function removeFriendRequest(senderUsername, recieverUsername) {
    await User.findByIdAndUpdate(recieverUsername, {
        $pull: {
            friendReq: senderUsername
        }
    });
}