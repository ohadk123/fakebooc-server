import  UserPostService from "../services/user-post.js";
import runController from "./runner.js";

// post
async function addPost(req, res) {
    const addPostData = await UserPostService.addPost(
        req.params.username,
        req.body.content,
        req.body.contentImage
    );
    
    runController(req.user, req.params.username, addPostData, res);
}

// delete
async function removePost(req, res) {
    const removePostData = await UserPostService.removePost(
        req.params.username,
        req.params.pid
    );

    runController(req.user, req.params.username, removePostData, res);
}

export default {addPost, removePost};