const connection = require('../config/database');
const { createUserName, getHome, userEdit, uploadUser, deleteUser } = require('../services/CRUDservices');
const User = require('../models/user');

const getHomePage = async (req, res) => {
    let results = await User.find();
    return res.render('sample.ejs', { listDataUsers: results });
}

const postusername = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    await User.create({
        email: email,
        name: name,
        city: city
    })
    res.redirect('/');
}

const getindex = (req, res) => {
    res.send('Hello World!', User)
}

const hendCreate = (req, res) => {
    res.render('userName.ejs');
}

//get user Id 
const hendEditName = async (req, res) => {
    const userId = req.params.id;
    let user = await User.findById(userId).exec();
    res.render('editName.ejs', { userEdit: user });
}

const hendUploadName = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.id;
    await User.updateOne({ _id: userId }, { email: email, name: name, city: city });
    res.redirect('/');
}

//get delete id user name 
const getUserIdName = async (req, res) => {
    const userId = req.params.id;
    let results = await User.findById(userId).exec();//mongoDB connection query
    res.render('delete.ejs', { userEdit: results });
}

const postDeleteName = async (req, res) => {
    let userId = req.body.id
    await User.deleteOne({ _id: userId })//mongoDB connection query
    res.redirect('/');
}

module.exports = {
    getHomePage, getindex, postusername, hendCreate, hendEditName, hendUploadName, getUserIdName, postDeleteName
}