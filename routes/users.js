const router = require('express').Router();
const { createUser, getUser, getUsers, renameUser, changeAvatar } = require('../controllers/users');

router.post('/users', createUser);
router.get('/users:userId', getUser);
router.get('/users', getUsers);
router.patch('/users/me', renameUser);
router.patch('/users/me/avatar', changeAvatar);

module.exports = router;