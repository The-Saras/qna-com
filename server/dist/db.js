import mongoose from "mongoose";
const URL = "mongodb+srv://saras:saras@cluster0.4xn2pz6.mongodb.net/?retryWrites=true&w=majority";
const connectToMongo = async () => {
    try {
        await mongoose.connect(URL, {});
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
export default connectToMongo;
//# sourceMappingURL=db.js.map