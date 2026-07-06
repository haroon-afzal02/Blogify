const { validateToken } = require("../services/auth");

function checkForAuthentication(cookieName) {
    return (req, res, next) => {
        const cookieValue = req.cookies[cookieName];
        if(!cookieValue) return next();

        try {
            const payload = validateToken(cookieValue);
            req.user = payload;
        } catch (error) {}
        return next();
    }
}

module.exports = {
    checkForAuthentication
}