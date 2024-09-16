import mongoose from "mongoose"

const connect = async (url) => {
    try {
        await mongoose.connect(url)
            .then(() => {
                console.log("Connected to MongoDB")
            })
            .catch((err) => {
                console.log("Error in mongoDB connection", err.message);
            })
    } catch (error) {
        console.log("Error  connecting to MongoDB:", error.message);
    }
}

export default connect;