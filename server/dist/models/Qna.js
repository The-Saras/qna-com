import * as mongoose from 'mongoose';
const Question = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number
    }
});
const qnaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});
export const QuesstionModel = mongoose.model('Question', Question);
export const QnaModel = mongoose.model('Qna', qnaSchema);
//# sourceMappingURL=Qna.js.map