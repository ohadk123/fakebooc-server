import PostService from "../services/post.js";
import Runner from "./runner.js";

// put
async function updatePost(req, res) {
  let updatePostData = Runner.authorizeRequest(req.user, req.params.username);

  updatePostData = await PostService.updatePost(
    req.params.username,
    req.params.pid,
    req.body.content,
    req.body.contentImage
  );

  Runner.runController(updatePostData, res);
}

export default { updatePost };
