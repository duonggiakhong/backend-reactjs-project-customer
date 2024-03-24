const User = require('../models/user');
const { uploadsingleFile, uploadMultiFiles } = require('../services/fileServices');

const getUserApi = async (req, res) => {
    let results = await User.find();
    res.status(200).json({
        er: 0,
        data: results
    })
}

const postusernameAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    let users = await User.create({
        email: email,
        name: name,
        city: city
    })

    res.status(200).json({
        er: 0,
        data: users
    })
}

//update user api
const putUploadNameAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.id;
    let users = await User.updateOne({ _id: userId }, { email: email, name: name, city: city });
    res.status(200).json({
        er: 0,
        data: users
    })
}

const DeleteUser = async (req, res) => {
    let userId = req.body.id
    let users = await User.deleteOne({ _id: userId })//mongoDB connection query

    res.status(200).json({
        er: 0,
        data: users
    })
}

const postUploadsingleFileAPI = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let results = await uploadsingleFile(req.files.image);
    // return res.send('upload success');
    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const postUploadMultiFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    if (Array.isArray(req.files.image)) {
        let results = await uploadMultiFiles(req.files.image);
        return res.status(200).json({
            er: 0,
            data: results
        })
    } else {
        //upload single file
        return await postUploadsingleFileAPI(req, res);
    }

}


module.exports = {
    getUserApi,
    postusernameAPI,
    putUploadNameAPI,
    DeleteUser,
    postUploadsingleFileAPI,
    postUploadMultiFileAPI
}