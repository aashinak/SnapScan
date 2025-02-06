import express from "express";
import axios from "axios";
import multer from "multer";
import Tesseract from "tesseract.js";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors());

// Multer for file upload
const upload = multer({ dest: "uploads/" });

// OCR Processing
app.post("/upload", upload.single("file"), async (req, res) => {
  const { path } = req.file;

  if (!path) {
    return res.status(400).json({ message: "File required" });
  }

  try {
    console.log(path);

    // Extract text using Tesseract.js
    const {
      data: { text },
    } = await Tesseract.recognize(path, "eng");

    // Generate a description using Ollama
    const aiResponse = await axios.post(
      `http://${process.env.HOSTIP}:11434/api/generate`,
      {
        model: "gemma2:2b",
        prompt: `Summarize this text: ${text}`,
        stream: false,
      }
    );

    const description = aiResponse.data.response;

    // Delete the uploaded file after processing
    try {
      await fs.unlink(path);
    } catch (err) {
      console.error(`Error deleting file: ${path}`, err);
    }

    res.json({ extractedText: text, description });
  } catch (error) {
    // Ensure to delete the file even in case of an error
    try {
      await fs.unlink(path);
    } catch (err) {
      console.error(`Error deleting file: ${path}`, err);
    }

    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
