const Customers = require("../models/customers");
const { usersAllowedUpdates } = require('../constants/usersAllowedUpdates');
const serverResponse = require('../utils/serverResponse');
const validator = require('validator');
const customers = require("../models/customers");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



const postCustomer = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync()
        const customers = new Customers({ ...req.body, salt })
        if (!validator.isStrongPassword(customers.password)) {
            return serverResponse(res, 404, { message: "password should be a strong password and not weawk" })
        }

        if (!validator.isEmail(customers.email)) {

            return serverResponse(res, 404, { message: "Email is invalid, please kindly fix it" })
        }
        const tokanpassword = jwt.sign( {id: customers.id, expiresIn: 79000}, process.env.JWT_SECRET)
        customers.password = bcrypt.hashSync(customers.password, salt)

//  
        await customers.save()

        return serverResponse(res, 200, {
            tokanpassword
            // , customer:
            // {
            //     userName: customers.userName,
            //     fullName: customers.fullName,
            //     email: customers.email,
            //     phoneNumber: customers.phoneNumber,
            //     typeTreatment: customers.typeTreatment,
            //     activePhysical: customers.activePhysical
            //     , password: customers.password
            // }
        })
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}



const verifyLoginCustomers = async (req, res) => {
    try {
        const loginInfo = { ...req.body }
        const existCustomer = await Customers.findOne({ email: loginInfo.email });
        if (!existCustomer) {
            return serverResponse(res, 401, { message: "no such user - email is incorrect." })
        }
        const isPassWordMatches = await bcrypt.compare(req.body.password, existCustomer.password)
        if (!isPassWordMatches) {
            return serverResponse(res, 401, { message: "the password you've entered is incorrect" })
        }
        const tokanpassword = jwt.sign( {id: customers.id, expiresIn: 7900000000}, process.env.JWT_SECRET)

        return serverResponse(res, 200, { existCustomer, tokanpassword })
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }

}

const getAllCustomers = async (req, res) => {
    try {

        const allCustomers = await Customers.find({})
            .select("-password");
        return serverResponse(res, 200, allCustomers)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

const getCustomerId = async (req, res) => {
    try {
        const customerId = req.params.customerId
        const customer = await customers.findOne({ _id: customerId }).select("-password");
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
        const customer = await Customers.findOne({ _id: customerId })
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
    verifyLoginCustomers
};