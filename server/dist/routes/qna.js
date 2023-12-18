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
import { z } from "zod";
import { authenticateJWT } from '../middlware/authUser.js';
import { QuesstionModel, QnaModel } from '../models/Qna.js';
const qModel = z.object({
    name: z.string().min(5)
});
const qnaModel = z.object({
    name: z.string().min(5),
});
const QnaValidation = (req, res, next) => {
    const { name } = req.body;
    const validationResult = qnaModel.safeParse({ name });
    if (validationResult.success) {
        next();
    }
    else {
        res.status(400).json({ message: "Some error try again you idiot" });
    }
};
router.post("/createqna", authenticateJWT, QnaValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    let createdByAdmin = req.headers['userId'];
    //console.log(typeof(createdByAdmin))
    var Qna = yield QnaModel.create({
        name: name,
        createdBy: createdByAdmin
    });
    res.json({ Qna });
}));
router.put("/upvote/:qid", authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qid = req.params.qid;
        QuesstionModel.updateOne({ _id: qid }, { $inc: { upvotes: 1 } })
            .then(() => {
            return res.json({ msg: "success" });
        }).catch((err) => {
            console.log(err);
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/createque/:location", authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const locationId = req.params.location;
    const QueToUpload = yield QnaModel.findById(locationId);
    if (!QueToUpload) {
        return res.status(400).send({ err: "Qna not found" });
    }
    const QueAsked = yield QuesstionModel.create({ text: text });
    QueToUpload.questions.push(QueAsked);
    QueToUpload.save();
    res.json({ QueAsked });
}));
router.get("/allqna", authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allQnas = yield QnaModel.find().populate({ path: "createdBy", select: "name" }).select("-questions");
        res.json({ allQnas });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/getallque/:id", authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const qnaId = req.params.id;
    const QuestionsInArray = yield QnaModel.findById(qnaId).populate({
        path: 'questions',
        options: { sort: { upvotes: -1 } } // Sort questions by upvotes in ascending order
    }).select('questions -_id');
    res.json({ QuestionsInArray });
}));
export default router;
//# sourceMappingURL=qna.js.map