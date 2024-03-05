import  UserPostService from "../services/user-post.js";

// post
async function addPost(req, res) {
    if (req.params.username !== req.user)
        return res.status(401).json({errors: ["Unauthorized access"]});

    const addPostData = await UserPostService.addPost(
        req.params.username,
        req.body.content,
        req.body.contentImage
    );

    if (addPostData.errors)
        res.status(400)
    else
        res.status(200)

    res.json(addPostData);
}

// delete
async function removePost(req, res) {
    if (req.params.username !== req.user)
        return res.status(401).json({errors: ["Unauthorized access"]});

    const removePostData = await UserPostService.removePost(
        req.params.username,
        req.params.pid
    );

    if (removePostData.errors) {
        if (removePostData.errors[0] === "Unauthorized access")
            res.status(401);
        else
            res.status(400);
    } else
        res.status(200);

    res.json(removePostData);
}

export default {addPost, removePost};