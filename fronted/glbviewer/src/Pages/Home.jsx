import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/models/all")
            .then(res => {
                setFiles(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="body">
                <div className="container">
                    <div className="home">
                        <div className="loading">
                            <div className="spinner"></div>
                            <div>Loading models...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="body">
            <div className="container">
                <div className="home">

                    <div className="header">
                        <h2 className="title">Available 3D Models</h2>
                        <a href="/dashboard" className="uploadLink">
                            ➕ Upload New Model
                        </a>
                    </div>

                    {files.length === 0 ? (
                        <div className="emptyState">
                            <div className="emptyStateIcon">📭</div>
                            <h3>No models yet</h3>
                            <p>Upload your first GLB model to get started!</p>
                            <a href="/dashboard" className="viewBtn emptyBtn">
                                Upload Your First Model
                            </a>
                        </div>
                    ) : (
                        <div className="modelsGrid">
                            {files.map((f, index) => (
                                <div 
                                    key={f._id || index} 
                                    className="modelCard"
                                >
                                    <div className="modelIcon">🎨</div>

                                    <div className="modelName">{f.filename}</div>

                                    <div className="uploadDate">
                                        {new Date(f.uploadDate).toLocaleDateString()}
                                    </div>

                                    <a 
                                        href={`/viewer?url=http://localhost:5000/api/models/${f.filename}`}
                                        className="viewBtn"
                                    >
                                        👁️ View Model
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
