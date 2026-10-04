require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { connectDB } = require('./src/config/db.config');
const { initSocket } = require('./src/config/socket.config');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        
        const server = http.createServer(app);
        
        // Cấu hình Socket.io
        initSocket(server);
        
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
