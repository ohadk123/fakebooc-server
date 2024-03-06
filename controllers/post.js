import PostService from "../services/post.js";
import Runner from "./runner.js";

// put
async function updatePost(req, res) {
    let updatePostData = Runner.authorizeRequest(req.user, req.params.username);

    if (!updatePostData)
        updatePostData = PostService.updatePost(
            req.params.pid,
            req.params.content,
            req.params.contentImage
        );

        Runner.runController(updatePostData, res);
}

export default {updatePost};