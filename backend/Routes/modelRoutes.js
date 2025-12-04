import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { Readable } from "stream";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "models",
    });
    const readableStream = Readable.from(req.file.buffer);
    const filename = `model_${Date.now()}.glb`;
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
      metadata: {
        originalName: req.file.originalname,
        uploadDate: new Date()
      }
    });
    readableStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
      res.json({ 
        message: "File uploaded successfully", 
        file: {
          id: uploadStream.id,
          filename: filename,
          size: req.file.size,
          originalName: req.file.originalname
        }
      });
    });

    uploadStream.on('error', (error) => {
      console.error("Upload stream error:", error);
      res.status(500).json({ error: "Upload failed", details: error.message });
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const files = await mongoose.connection.db
      .collection("models.files")
      .find()
      .toArray();

    res.json(files);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});
router.get("/:filename", (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "models",
    });

    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    
    downloadStream.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(404).json({ error: "File not found" });
    });
    
    res.set('Content-Type', 'model/gltf-binary');
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
});
router.delete("/:filename", async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "models",
    });
    const files = await mongoose.connection.db
      .collection("models.files")
      .find({ filename: req.params.filename })
      .toArray();

    if (files.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }
    await bucket.delete(files[0]._id);
    res.json({ message: "File deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

export default router;