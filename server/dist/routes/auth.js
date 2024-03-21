var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const router = express.Router();
import { UserModel } from '../models/User.js';
import { z } from 'zod';
import { authenticateJWT } from '../middlware/authUser.js';
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
const SECRET = "someranw582er0948doimje509345brigh";
const userObject = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(5).max(20)
});
const UserValidation = (req, res, next) => {
    const { name, email, password } = req.body;
    const validationResult = userObject.safeParse({ name, email, password });
    if (validationResult.success) {
        next();
    }
    else {
        res.status(400).json({ message: "Some error try again you idiot" });
    }
};
router.post("/register", UserValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt.genSalt(10);
        const secPass = yield bcrypt.hash(password, salt);
        let userExits = yield UserModel.findOne({ email: email });
        if (userExits) {
            return res.status(400).json({ error: "Emial already in use" });
        }
        userExits = yield UserModel.create({
            name: name,
            email: email,
            password: secPass
        });
        const authToken = jsonwebtoken.sign({ id: userExits._id }, SECRET);
        res.json({ authToken });
    }
    catch (error) {
        console.error(error);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let fuser = yield UserModel.findOne({ email });
        if (!fuser) {
            return res.status(400).json({ error: "Enter valid details" });
        }
        const passwordCompare = bcrypt.compare(password, fuser.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Enter valid details" });
        }
        const authToken = jsonwebtoken.sign({ id: fuser.id }, SECRET);
        res.json({ authToken });
    }
    catch (error) {
        console.error(error);
    }
}));
router.get("/me", authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usreId = req.headers['userId'];
    const user = yield UserModel.findOne({ _id: usreId }).select("-password");
    if (user) {
        return res.json(user);
    }
    else {
        res.status(403).json({ message: "User not logged in!" });
    }
}));
export default router;
//# sourceMappingURL=auth.js.map