import mongoose from "mongoose";

const UrlSchema = mongoose.Schema(
    {
        ogUrl: {
            type: String,
            required: true
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
)

const UrlModel = mongoose.model('url', UrlSchema);
export default UrlModel;