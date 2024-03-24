const Customer = require('../models/customer');
const { createCustomerServices,
    createCustomerArrayServices,
    getAllCustomerServices,
    putCustomerServices,
    deleteCustomerServices,
    deleteCustomerManyServices } = require('../services/customerServices')
const { uploadsingleFile } = require('../services/fileServices');

const postCustomersApi = async (req, res) => {

    let { name, address, phone, email, description } = req.body;
    let imageUrl = "";

    if (!req.files || Object.keys(req.files).length === 0) {
        //do nothing
    } else {
        let result = await uploadsingleFile(req.files.image);
        imageUrl = result.path;
    }

    let customerData = {
        name,
        address,
        phone,
        email,
        description,
        image: imageUrl
    }
    let customer = await createCustomerServices(customerData);

    return res.status(200).json({
        er: 0,
        data: customer
    })
}

const postCustomersArrayApi = async (req, res) => {
    let customerArray = await createCustomerArrayServices(req.body.customers);

    if (customerArray) {
        return res.status(200).json({
            er: 0,
            data: customerArray
        })
    } else {
        return res.status(200).json({
            er: -1,
            data: customerArray
        })
    }

}

const getCustomersApi = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let name = req.query.name;
    let result = null;
    console.log("check req.query:", req.query);
    if (limit && page) {
        result = await getAllCustomerServices(limit, page, name, req.query);
    } else
        result = await getAllCustomerServices();

    res.status(200).json({
        er: 0,
        data: result
    })
}

const putCustomersApi = async (req, res) => {
    let { id, name, address, phone, email, description } = req.body;

    let customer = await putCustomerServices(id, name, address, phone, email, description);
    res.status(200).json({
        er: 0,
        data: customer
    })

}

const deleteCustomersApi = async (req, res) => {
    let id = req.body.id
    let customer = await deleteCustomerServices(id)//mongoDB connection query

    res.status(200).json({
        er: 0,
        data: customer
    })
}

const deleteManyCustomersApi = async (req, res) => {
    let ids = req.body.customerId;
    let customer = await deleteCustomerManyServices(ids);

    res.status(200).json({
        er: 0,
        data: customer
    })
}
module.exports = {
    postCustomersApi,
    postCustomersArrayApi,
    getCustomersApi,
    putCustomersApi,
    deleteCustomersApi,
    deleteManyCustomersApi
}