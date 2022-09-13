const Providers = require('../models/serviceProviders')
const serverResponse = require('../utils/serverResponse')
const validator = require('validator');
const { providersAllowedUpdates } = require('../constants/usersAllowedUpdates');

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
const verifyLoginProviders = async (req, res) => {
    try {

        const loginInfo = { ...req.body }
        const existCustomer = await Providers.findOne({ email: loginInfo.email, password: loginInfo.password }).select("-password");

        if (!existCustomer) {
            return serverResponse(res, 401, { message: "no such user - password or email is incorrect." })
        }

        return serverResponse(res, 200, existCustomer)
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
const getProviderId = async (req, res) => {
    try {
        const providerId = req.params.providerId
        const provider = await Providers.findOne({ _id: providerId }).select("-password");
        return serverResponse(res, 200, provider)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}
const deleteProviderId = async (req, res) => {
    try {
        const providerId = req.params.providerId;
        const provider = await Providers.findOneAndDelete({ _id: providerId });
        return serverResponse(res, 200, provider)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
}

const putProviderId = async (req, res) => {

    const providerId = req.params.providerId;
    
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update) => providersAllowedUpdates.includes(update));

    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "Invalid updates" });
    }

    try {
        const provider = await Providers.findOne({ _id: providerId })
        if (!provider) {
            return serverResponse(res, 404, { message: "customer does not exist" });
        }
        updates.forEach((update) => (provider[update] = req.body[update]));
        await provider.save();
        return serverResponse(res, 200, provider);
    } catch (err) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to update user"
        }
        );

    }
}


module.exports = {
    postProvider,
    getAllProvider,
    verifyLoginProviders,
    getProviderId,
    deleteProviderId,
    putProviderId
};