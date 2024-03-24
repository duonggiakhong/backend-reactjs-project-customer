
const express = require('express');
const router = express.Router();
const { getHomePage, getindex, postusername, hendCreate, hendEditName,
    hendUploadName, getUserIdName, postDeleteName } = require('../controllers/homecontroller');

//router    .method('/router, (handler));
router.get('/', (getHomePage));
router.get('/hoidanit', (getindex));
router.post('/createusername', (postusername));
router.get('/create', (hendCreate));
router.get('/editName/:id', (hendEditName));
router.post('/uploadUserName', (hendUploadName));
//henddeleteUser
router.get('/delete/:id', (getUserIdName));
//post Delete User
router.post('/postDeleteUser', (postDeleteName));


module.exports = router;