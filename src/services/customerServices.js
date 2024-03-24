
const Customer = require('../models/customer');
const aqp = require('api-query-params');

const createCustomerServices = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        });
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const createCustomerArrayServices = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllCustomerServices = async (limit, page, name, queryString) => {

    try {
        let result = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter } = aqp(queryString);
            delete filter.page;
            console.log("check filter:", filter);
            result = await Customer.find(filter).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({});
        }
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const putCustomerServices = async (id, name, address, phone, email, description) => {
    try {
        let result = await Customer.updateOne({ _id: id }, { name: name, address: address, phone: phone, email: email, description: description });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const deleteCustomerServices = async (id) => {
    try {
        let resulsts = await Customer.deleteById(id);
        return resulsts
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteCustomerManyServices = async (arrIds) => {
    try {

        let resulsts = await Customer.delete({ _id: { $in: arrIds } });
        return resulsts;
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    createCustomerServices,
    createCustomerArrayServices,
    getAllCustomerServices,
    putCustomerServices,
    deleteCustomerServices,
    deleteCustomerManyServices
}
