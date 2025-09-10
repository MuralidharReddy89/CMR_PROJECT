const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const leadRouter = require('./routes/leadRoute');
const opportunityRouter = require('./routes/opportunityRoute');
const authRouters = require('./routes/authRoute');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(cors());          // Enable cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


// Routes
app.use('/api/leads', leadRouter);
app.use('/api/opportunities', opportunityRouter);
app.use('/api/auth', authRouters);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
