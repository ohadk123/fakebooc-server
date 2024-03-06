import PostService from "../services/post.js";
import {authorizeRequest, runController} from "./runner.js";

// put
async function updatePost(req, res) {
    let updatePostData = authorizeRequest(req.user, req.params.username);

    if (!updatePostData)
        updatePostData = PostService.updatePost(
            req.params.pid,
            req.params.content,
            req.params.contentImage
        );

    runController(updatePostData, res);
}

export default {updatePost};