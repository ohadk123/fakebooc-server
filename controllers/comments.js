import CommentsService from "../services/comments.js";
import runController from "./runner.js";

async function addComment(req, res) {
    const addCommentData = await CommentsService.addComment(
        req.user,
        req.params.pid,
        req.body.content
    );

    runController(addCommentData, res);
}

async function getComments(req, res) {
    const getCommentsData = await CommentsService.getComments(
        req.params.pid
    );

    runController(getCommentsData, res);
}

async function removeComment(req, res) {
    const removeCommentData = CommentsService.removeComment(
        req.user,
        req.params.cid
    );

    runController(removeCommentData, res);
}

async function updateComment(req, res) {
    const updateCommentData = CommentsService.updateComment(
        req.user,
        req.params.cid,
        req.body.content
    );

    runController(updateCommentData, res);
}

export default {addComment, getComments, removeComment, updateComment};