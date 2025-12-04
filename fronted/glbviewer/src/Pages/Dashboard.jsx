import React, { useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            await axios.post("http://localhost:5000/api/models/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Model uploaded successfully! 🎉");
            setFile(null);
        } catch (err) {
            console.error(err);
            alert("Upload failed! Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container">
            <div className="viewer-header">
                <a href="/" className="back-btn">← Back to Home</a>
            </div>
            <div className="dashboard">
                <h2>Upload GLB Model</h2>
                
                <div className={`upload-area ${file ? 'has-file' : ''}`}>
                    <label htmlFor="file-input" className="file-label">
                        <input 
                            id="file-input"
                            className="file-input"
                            type="file" 
                            accept=".glb,.gltf"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <div className="upload-icon">
                            {file ? '✓' : '📦'}
                        </div>
                        <div className="file-info">
                            {file ? (
                                <>
                                    <div>Selected:</div>
                                    <div className="file-name">{file.name}</div>
                                    <div style={{marginTop: '0.5rem', fontSize: '0.85rem'}}>
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>Click to select GLB file</div>
                                    <div style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>
                                        or drag and drop
                                    </div>
                                </>
                            )}
                        </div>
                    </label>
                </div>

                <button 
                    className="upload-btn" 
                    onClick={handleUpload}
                    disabled={!file || uploading}
                >
                    {uploading ? '⏳ Uploading...' : '🚀 Upload Model'}
                </button>
            </div>
        </div>
    );
}