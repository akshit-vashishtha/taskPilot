const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
 
app.use(express.urlencoded({ extended: false }));

const projectRouter=require('./routes/project')
const userRouter=require('./routes/user')
const taskRouter=require('./routes/task')
const loginRouter = require('./routes/auth');
dotenv.config(); 
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());

// const corsOptions = {
//     origin: '', 
//     credentials: true, 
// };
const protect = require('./middleware/authmiddleware');


// Use a sensible default so the server can start during local development
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use('/', loginRouter);
app.use('/project', projectRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);

// Lightweight health check for quick diagnostics
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', pid: process.pid });
});

// app.use('/dashboard', protect, jobRouter);

// Database Connection
mongoose.connect(process.env.MONGO_URI, ).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
