# GLB 3D Model Viewer (MERN Stack)

A full‑stack web application that allows users to upload, store, manage, and view **3D GLB models** using a React-based frontend and a Node.js + Express + MongoDB (GridFS) backend.

This project includes:

* **Dashboard** for uploading GLB files
* **3D Viewer** built with `@react-three/fiber` & `@react-three/drei`
* **API** for uploading, fetching, and serving GLB models
* **MongoDB GridFS storage** for handling large 3D model files
* **Deployment-ready** configuration for Vercel/Render/GitHub

---

## 🚀 Features

* Upload `.glb` files through a dashboard
* Store 3D models securely in MongoDB using GridFS
* Fetch & render GLB models in a real-time 3D viewer
* Clean UI built with React + Vite
* Fully functional backend API
* Production-ready deployment steps included

---

## 🗂️ Project Structure

```
project-root/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    ├── App.jsx
    ├── package.json
    └── .env
```

---

## 🛠️ Technologies Used

### Frontend

* React (Vite)
* @react-three/fiber
* @react-three/drei
* Axios
* TailwindCSS (optional)

### Backend

* Node.js
* Express.js
* Multer
* Multer-GridFS-Storage
* MongoDB (GridFS)
* CORS
* dotenv

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone <repo-url>
cd project-root
```

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGODB_URI=your_mongodb_uri
PORT=4000
```

Run backend:

```
npm run dev
```

### 3️⃣ Frontend Setup

```
cd frontend
npm install
```

Create `.env`:

```
VITE_API_BASE=http://localhost:4000
```

Run frontend:

```
npm run dev
```

---

## 📡 API Endpoints

### **Upload Model (POST)**

`POST /api/models/upload`

* Upload GLB file

### **Get All Models (GET)**

`GET /api/models/all`

* Returns list of uploaded files

### **Stream Model (GET)**

`GET /api/models/file/:id`

* Returns GLB file stream

---

## 🖥️ Frontend Pages

### **Dashboard**

* Upload and manage GLB models

### **Viewer**

* Renders selected GLB model using React Three Fiber
### **Home**

* Available files are listed
---
## 📌 Future Enhancements

* Add authentication for dashboard
* Add model previews (thumbnails)
* Add model categories & metadata
* Add delete/edit functionality

---

## 🙌 Author

Created for learning & demonstration purposes.

Feel free to fork, improve, and extend the project!
