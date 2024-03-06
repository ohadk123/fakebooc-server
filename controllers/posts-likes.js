import PostLikesService from "../services/posts-likes.js";
import runController from "./runner.js";

async function getLikes(req, res) {
    const getLikesData = PostLikesService.getLikes(
        req.params.pid
    );

    runController(getLikesData, res);
}

async function addLike(req, res) {
    const addLikeData = PostLikesService.addLike(
        req.user,
        req.params.pid
    );

    runController(addLikeData, res);
}

async function removeLike(req, res) {
    const removeLikeData = PostLikesService.removeLike(
        req.user,
        req.params.pid
    );

    runController(removeLikeData, res);
}

export default {getLikes, addLike, removeLike};