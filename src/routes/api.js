const express = require('express');
const routerApi = express.Router();
const { getUserApi, postusernameAPI,
    putUploadNameAPI, DeleteUser,
    postUploadsingleFileAPI,
    postUploadMultiFileAPI,
} = require('../controllers/apiController');

//router    .method('/router, (handler));

//Api User
routerApi.get('/users', (getUserApi));
routerApi.post('/users', (postusernameAPI));
routerApi.put('/users', (putUploadNameAPI));
routerApi.delete('/users', (DeleteUser));

routerApi.post('/file', (postUploadsingleFileAPI));
routerApi.post('/files', (postUploadMultiFileAPI));

const { postCustomersApi,
    postCustomersArrayApi,
    getCustomersApi,
    putCustomersApi,
    deleteCustomersApi,
    deleteManyCustomersApi } = require('../controllers/customerControllerApi')
// Api Customer
routerApi.post('/customers', (postCustomersApi));
routerApi.post('/customersMany', (postCustomersArrayApi));
routerApi.get('/customers', (getCustomersApi));
routerApi.put('/customers', (putCustomersApi));
routerApi.delete('/customers', (deleteCustomersApi));
routerApi.delete('/customersMany', (deleteManyCustomersApi));


module.exports = routerApi;