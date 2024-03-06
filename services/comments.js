import Comment from "../models/comment.js";
import getErrorJson from "./error.js";

async function addComment(uploader, pid, content) {
    if (!content)
        return getErrorJson(400, ["Post must have some content"]);

    const comment = new Comment({
        post: pid,
        uploader: uploader,
        content: content
    });

    return await comment.save();
}

async function getComments(pid) {
    return await Comment.find({post: pid});
}

async function removeComment(username, cid) {
    const comment = await Comment.findById(cid);
    if (!comment)
        return getErrorJson(404, ["Comment not found"]);

    if (comment.uploader !== username)
        return getErrorJson(403, ["Forbidden access"]);

    return await Comment.findByIdAndDelete(cid);
}

async function updateComment(username, cid, newContent) {
    const comment = await Comment.findById(cid);
    if (!comment)
        return getErrorJson(404, ["Comment not found"]);

    if (username !== comment.uploader)
        return getErrorJson(403, ["Forbidden access"]);

    let content = comment.content;
    if (newContent)
        content = newContent;

    return await Comment.findByIdAndUpdate(cid, {
       content: content 
    });
}

export default {addComment, getComments, removeComment, updateComment};