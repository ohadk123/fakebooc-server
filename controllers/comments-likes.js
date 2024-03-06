import CommentLikesService from "../services/comments-likes.js";
import Runner from "./runner.js";

async function getLikes(req, res) {
    const getLikesData = await CommentLikesService.getLikes(
        req.params.cid
    );

    Runner.runController(getLikesData, res);
}

async function addLike(req, res) {
    const addLikeData = await CommentLikesService.addLike(
        req.user,
        req.params.cid
    );

    Runner.runController(addLikeData, res);
}

async function removeLike(req, res) {
    const removeLikeData = await CommentLikesService.removeLike(
        req.user,
        req.params.cid
    );

    Runner.runController(removeLikeData, res);
}

export default {getLikes, addLike, removeLike};