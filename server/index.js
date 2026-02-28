require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productRoutes = require('./routes/products');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for easier setup with Supabase/Firebase in trial
}));
app.use(cors({
    origin: process.env.CLIENT_URL || true, // Allow configured client URL or reflect origin
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('(.*)', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
}

// Error handler
app.use((err, req, res, next) => {
    console.error('Error detail:', err);
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
