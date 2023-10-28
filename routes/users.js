const router = require('express').Router();

const {
  validateRenameUser,
  validateChangeAvatar,
  validateGetUser,
} = require('../middlewares/validation');

const {
  getUser,
  getUsers,
  renameUser,
  changeAvatar,
} = require('../controllers/users');

router.get('/users:userId', validateGetUser, getUser);
router.get('/users', getUsers);
router.patch('/users/me', validateRenameUser, renameUser);
router.patch('/users/me/avatar', validateChangeAvatar, changeAvatar);

module.exports = router;
