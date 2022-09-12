const Customers = require("../models/customers");
const { usersAllowedUpdates } = require('../constants/usersAllowedUpdates')
const serverResponse = require('../utils/serverResponse')
const validator = require('validator');
const customers = require("../models/customers");


const postCustomer = async (req, res) => {
    try {

        const customers = new Customers({ ...req.body })
        if (!validator.isStrongPassword(customers.password)) {
            return serverResponse(res, 404, { message: "password should be a strong password and not weawk" })
        }

        if (!validator.isEmail(customers.email)) {

            return serverResponse(res, 404, { message: "Email is invalid, please kindly fix it" })
        }
        await customers.save()
        return serverResponse(res, 200, customers)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

const verifyLogin = async (req, res) => {
    try {

        const loginInfo = { ...req.body }
        const existCustomer = await Customers.findOne({ email: loginInfo.email, password: loginInfo.password }).select("-password");

        if (!existCustomer) {
            return serverResponse(res, 401, { message: "no such user - password or email is incorrect." })
        }

        return serverResponse(res, 200, existCustomer)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }

}

const getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await Customers.find({})
            //.select("_id userName fullName email  phoneNumber typeTreatment activePhysical");
            .select("-password");
        return serverResponse(res, 200, allCustomers)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

const getCustomerId = async (req, res) => {
    try {
        const customerId = req.params.customerId
        const customer = await customers.findOne({ _id: customerId })
        return serverResponse(res, 200, customer)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

const deleteCustomerId = async (req, res) => {
    try {
        const customerId = req.params.customerId
        const customer = await customers.findOneAndDelete({ _id: customerId })
        return serverResponse(res, 200, customer)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

const putCustomerId = async (req, res) => {

    const customerId = req.params.customerId;

    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update) =>
        usersAllowedUpdates.includes(update));

    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "Invalid updates" });
    }

    try {
        const customer = await customers.findOne({ _id: customerId })
        if (!customer) {
            return serverResponse(res, 404, { message: "customer does not exist" });
        }
        updates.forEach((update) => (customer[update] = req.body[update]));
        await customer.save();
        return serverResponse(res, 200, customer);
    } catch (err) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to update user"
        }
        );

    }
}

// app.get("*", (req, res) => {
//     res.sendFile(__dirname + "/client/build/index.html")
// })

module.exports = {
    getAllCustomers,
    getCustomerId,
    postCustomer,
    deleteCustomerId,
    putCustomerId,
    verifyLogin
};