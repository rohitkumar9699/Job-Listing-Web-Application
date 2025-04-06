
# 💼 Job Listing Web App

A full-stack job listing application with user authentication, job browsing, and location-based search. Built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- 🔐 User Registration & Login with Validation  
- 👁️ Password Show/Hide Toggle  
- 🌍 Location-Based Job Search (Backend Filtering)  
- 📃 Dynamic Job Detail View  
- 💾 Session Handling via LocalStorage  
- 📱 Fully Responsive & Modern UI with Tailwind CSS  

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB (Mongoose)  

---

## 📦 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/rohitkumar9699/Job-Listing-Web-Application.git
cd Job-Listing-Web-Application
```

---

### 2. Setup & Run Backend

```bash
cd backend
npm install
npm run dev
```

✅ Backend will start on: `http://localhost:5000`

Create a `.env` file inside `backend/` with the following content:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### 3. Setup & Run Frontend

```bash
cd frontend
npm install
npm start
```

✅ Frontend will start on: `http://localhost:3000`

Create a `.env` file inside `frontend/` with the following content:

```
REACT_APP_SERVER_URL=http://localhost:5000
```

---

## 🌐 Deployed Links

- 🔗 **Frontend (React):** [https://job-listing-web-application-frontend.vercel.app](https://job-listing-web-application-frontend.vercel.app)  
- 🔗 **Backend (API):** [https://job-listing-web-application-backend.vercel.app](https://job-listing-web-application-backend.vercel.app)

---

## 📁 Folder Structure

```
job-listing-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── jobController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes/
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── utils/   (Puprpose of this was to recover the Email passward But Not implemented yet)
│   │   └── sendEmail.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobList.js
│   │   │   ├── JobDetail.js
│   │   │   └── SearchBar.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Home.js
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── README.md
```

---

## 🧑‍💻 Author

Developed by [**Rohit Kumar**](https://github.com/rohitkumar9699) 🚀  
Feel free to fork, star ⭐, and contribute!
