const Providers = require('../models/serviceProviders')
const serverResponse = require('../utils/serverResponse')
const validator = require('validator');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { providersAllowedUpdates } = require('../constants/usersAllowedUpdates');


const postProvider = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync()
        const providers = new Providers({ ...req.body, salt })
        if (!validator.isStrongPassword(providers.password)) {
            return serverResponse(res, 404, { message: "password should be a strong password and not weawk" })
        }

        if (!validator.isEmail(providers.email)) {

            return serverResponse(res, 404, { message: "Email is invalid, please kindly fix it" })
        }
       
        const tokanpassword =  jwt.sign({ id: providers.id, JWT_SECRET, expiresIn: 7900 }, "MOSHE_OGALBO_TOP_SECRET");

        providers.password = bcrypt.hashSync(providers.password, salt)
        await providers.save()
        return serverResponse(res, 200, { tokanpassword })

    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}


const verifyLoginProviders = async (req, res) => {
    try {

        const loginInfo = { ...req.body }
        const existProviders = await Providers.findOne({ email: loginInfo.email });
        if (!existProviders) {
            return serverResponse(res, 401, { message: "no such user - password or email is incorrect." })
        }
        const isPassWordMatches = await bcrypt.compare(req.body.password, existProviders.password)
        if (!isPassWordMatches) {
            return serverResponse(res, 401, { message: "the password you've entered is incorrect" })
        }
        const tokanpassword = jwt.sign({ id: Providers.id, JWT_SECRET, expiresIn: 7900 }, "MOSHE_OGALBO_TOP_SECRET")
        

        return serverResponse(res, 200, { tokanpassword, existProviders })
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