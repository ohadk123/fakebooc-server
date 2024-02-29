import express from "express";
import PostController from "../controllers/post.js"
import UserPostController from "../controllers/user-post.js"
import UserFriendPostController from "../controllers/user-friend-post.js"
const usersPostsRouter = express.Router();

usersPostsRouter.route("/")
    .get(UserFriendPostController.getUserPosts)
    .post(UserPostController.addPost);

usersPostsRouter.route("/:pid")
    .put(PostController.updatePost)
    .delete(UserPostController.removePost);

export default usersPostsRouter