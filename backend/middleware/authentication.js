const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            jwt.verify(token, "olxraj", (err, decoded) => {
                if (err) {
                    res.json({ msg: "token verification failed please try again", err })
                }
                else if (decoded) {
                    req.body.userID = decoded.userID;
                    next();
                }
                else if (!decoded) {
                    res.json({ msg: "token expired" });
                }
            })
        } catch (error) {
            res.json({ msg: "Something went wrong while authentication " + error })
        }
    }
    else {
        res.json({ msg: "Please login first" });
    }
}

module.exports = authentication;