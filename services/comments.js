import Comment from "../models/comment.js";
import getErrorJson from "./error.js";
import User from "./user.js";

async function addComment(uploader, pid, content) {
  if (!content) return getErrorJson(400, ["Comment must have some content"]);

  const comment = new Comment({
    post: pid,
    uploader: uploader,
    content: content,
  });

  return await comment.save();
}

async function getComments(pid) {
  let comments = await Comment.find({ post: pid });
  for (const comment of comments) {
    let user = await User.getUser(comment.uploader);
    comment.uploader = user;
  }
  console.log(comments);
  return comments;
}

async function removeComment(username, cid) {
    
  try {
    const comment = await Comment.findById(cid);
    if (!comment) return getErrorJson(404, ["Comment not found"]);

    if (comment.uploader !== username)
      return getErrorJson(403, ["Forbidden access"]);

    return await Comment.findByIdAndDelete(cid);
  } catch (error) {
    return getErrorJson(404, ["Comment not found"]);
  }
}

async function updateComment(username, cid, newContent) {
  try {
    const comment = await Comment.findById(cid);
    if (!comment) return getErrorJson(404, ["Comment not found"]);

    if (username !== comment.uploader)
      return getErrorJson(403, ["Forbidden access"]);

    let content = comment.content;
    if (newContent) content = newContent;

    await Comment.findByIdAndUpdate(cid, {
      content: content,
    });

    return await Comment.findById(cid);
  } catch (error) {
    return getErrorJson(404, ["Comment not found"]);
  }
}

export default { addComment, getComments, removeComment, updateComment };
