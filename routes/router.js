import express from "express";
const router = express.Router();

router.route("/users")
    .post();

router.route("/tokens")
    .post();

router.route("/posts")
    .get();

router.route("/users/:username")
    .get()
    .put()
    .delete();

router.route("/users/:username/posts")
    .get()
    .post();

router.route("/users/:username/posts/:pid")
    .put()
    .delete();

router.route("/users/:username/friends")
    .get()
    .post();

router.route("/users/:username/friends/:fusername")
    .patch()
    .delete();

export default router;