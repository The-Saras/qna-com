import jsonwebtoken from "jsonwebtoken";
const SECRET = "someranw582er0948doimje509345brigh";
const authenticateUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please authenticate with right token" });
    }
    try {
        const data = jsonwebtoken.verify(token, SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        console.error(error);
    }
};
export default authenticateUser;
//# sourceMappingURL=authUser.js.map