const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
 
app.use(express.urlencoded({ extended: false }));

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


const PORT = process.env.PORT;
app.use(express.json());
app.use('/', loginRouter);

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
