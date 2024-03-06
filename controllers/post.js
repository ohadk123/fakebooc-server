import PostService from "../services/post.js";
import runController from "./runner.js";

// put
async function updatePost(req, res) {
    const updatePostData = PostService.updatePost(
        req.params.pid,
        req.params
    );
}

export default {updatePost};