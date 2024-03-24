const connection = require('../config/database');


const getHome = async () => {
    let [results, fields] = await connection.query('select * from Users');
    return results;
}

const createUserName = (email, name, city) => {
    connection.query(
        `INSERT INTO Users(email, name, city)
        VALUES(?, ?, ?)`,
        [email, name, city]
    );


}

// loop id user
const userEdit = async (userId) => {
    let [results, fields] = await connection.query('select * from Users where id = ?', [userId]);
    return results
}

const uploadUser = async (email, name, city, userId) => {
    await connection.query(
        `UPDATE Users 
        SET email = ?, name = ?, city = ? 
        WHERE id = ?` , [email, name, city, userId]);

}

const deleteUser = async (userId) => {
    await connection.query(
        `DELETE FROM Users WHERE id = ?`, [userId]);

}


module.exports = { createUserName, getHome, userEdit, uploadUser, deleteUser }
