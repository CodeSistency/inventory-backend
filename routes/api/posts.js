const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/postsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), postsController.getAllPosts)
    .post(verifyRoles(ROLES_LIST.Admin), postsController.createNewPost)
    .put(verifyRoles(ROLES_LIST.Admin), postsController.updatePost)
    .delete(verifyRoles(ROLES_LIST.Admin), postsController.deletePost);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), postsController.getPost);

module.exports = router;