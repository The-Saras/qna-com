import express from 'express';
const router = express.Router();
import { UserModel } from '../models/User.js';
import { z } from 'zod';
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
router.post("/register", UserValidation, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let userExits = await UserModel.findOne({ email: email });
        if (userExits) {
            return res.status(400).json({ error: "Emial already in use" });
        }
        userExits = await UserModel.create({
            name: name,
            email: email,
            password: password
        });
        res.json({ userExits });
    }
    catch (error) {
        console.error(error);
    }
});
export default router;
//# sourceMappingURL=auth.js.map