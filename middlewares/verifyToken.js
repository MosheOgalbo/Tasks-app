const jwt = require("jsonwebtoken");
const serverResponse = require('../utils/serverResponse');
const TEN_MINUTES = 1000 * 60 * 10;

const someVerifyTokenFunction = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            return serverResponse(res, 401, { message: " no tocken valid of user  " })
        }

        const nweTocken = jwt.verify(token, process.env.JWT_SECRET);

        if (Date.now() - new Date(nweTocken.iat) > TEN_MINUTES) {
            console.log('got inside')
            req.headers['x-access-token'] = nweTocken
        } else {
            req.headers['x-access-token'] = undefined
            return serverResponse(res, 401, { message: "your tocken has expired" })
        }
        next();
    }
    catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

module.exports = someVerifyTokenFunction