import jsonwebtoken from "jsonwebtoken";
const SECRET = "someranw582er0948doimje509345brigh";
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jsonwebtoken.verify(authHeader, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            if (typeof user === "string") {
                return res.sendStatus(403);
            }
            req.headers['userId'] = user.id;
            next();
        });
    }
};
//# sourceMappingURL=authUser.js.map