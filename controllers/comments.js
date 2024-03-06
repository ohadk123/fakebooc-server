import CommentsService from "../services/comments.js";
import Runner from "./runner.js";

async function addComment(req, res) {
    const addCommentData = await CommentsService.addComment(
        req.user,
        req.params.pid,
        req.body.content
    );

    Runner.runController(addCommentData, res);
}

async function getComments(req, res) {
    const getCommentsData = await CommentsService.getComments(
        req.params.pid
    );

    Runner.runController(getCommentsData, res);
}

async function removeComment(req, res) {
    const removeCommentData = await CommentsService.removeComment(
        req.user,
        req.params.cid
    );

    Runner.runController(removeCommentData, res);
}

async function updateComment(req, res) {
    const updateCommentData = await CommentsService.updateComment(
        req.user,
        req.params.cid,
        req.body.content
    );

    Runner.runController(updateCommentData, res);
}

export default {addComment, getComments, removeComment, updateComment};