const Providers = require('../models/serviceProviders')
const serverResponse = require('../utils/serverResponse')
const validator = require('validator');

const postProvider = async (req, res) => {
    try {

        const providers = new Providers({ ...req.body })
        if (!validator.isStrongPassword(providers.password)) {
            return serverResponse(res, 404, { message: "password should be a strong password and not weawk" })
        }

        if (!validator.isEmail(providers.email)) {

            return serverResponse(res, 404, { message: "Email is invalid, please kindly fix it" })
        }
        await providers.save()
        return serverResponse(res, 200, providers)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

const getAllProvider = async (req, res) => {
    try {
        const allProvider = await Providers.find({}).select("-password");
        return serverResponse(res, 200, allProvider);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}






module.exports = {
    postProvider,
    getAllProvider
};