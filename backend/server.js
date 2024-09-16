import express from 'express';
import connect from './dbconfig/connection.js';
import dotenv from 'dotenv';
import UrlModel from './models/url.model.js';
import cors from 'cors';
import QRCode from 'qrcode';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connect(process.env.MONGO_URI);


// create and store short url
app.post('/urlshort', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: "Please provide a URL." });
    }
    try {
        const shorter = Math.random().toString(36).substring(3, 10);
        const newUrl = new UrlModel({
            ogUrl: url,
            shortUrl: `http://localhost:${PORT}/${shorter}`
        })
        console.log(newUrl);
        await newUrl.save();

        res.json(
            {
                shortUrl: newUrl.shortUrl
            }
        )
    } catch (error) {
        console.log("Error in url post : ", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})


// redirect to the ogUrl when enter short url
app.get('/:shortid', async (req, res) => {
    const shortid = req.params.shortid;
    const shortUrl = `http://localhost:${PORT}/${shortid}`;
    try {
        const urlData = await UrlModel.findOne({ shortUrl });
        console.log(urlData);
        if (!urlData) {
            return res.status(404).json({ message: "URL not found" });
        }
        res.redirect(urlData.ogUrl);
    } catch (error) {
        console.log("Error redirecting short URL");
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

// API route to generate the QR code
app.post("/generate-qr", (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
  
    // Generate the QR code from the URL
    QRCode.toDataURL(url, (err, src) => {
      if (err) return res.status(500).json({ error: "Error generating QR code" });
  
      // Send the QR code image URL to the frontend
      res.json({ qrCode: src });
    });
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})