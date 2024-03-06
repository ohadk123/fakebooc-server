import  UserPostService from "../services/user-post.js";
import {authorizeRequest, runController} from "./runner.js";

// post
async function addPost(req, res) {
    let addPostData = authorizeRequest(req.user, req.params.username);

    if (!addPostData)
        addPostData = await UserPostService.addPost(
            req.params.username,
            req.body.content,
            req.body.contentImage
        );
    
    runController(addPostData, res);
}

// delete
async function removePost(req, res) {
    let removePostData = authorizeRequest(req.user, req.params.username);

    if (!removePostData)
        removePostData = await UserPostService.removePost(
            req.params.username,
            req.params.pid
        );

    runController(removePostData, res);
}

export default {addPost, removePost};