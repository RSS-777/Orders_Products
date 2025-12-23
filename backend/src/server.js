require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const usersRoutes = require('./routes/usersRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products')));
app.use('/uploads/user', express.static(path.join(__dirname, 'uploads/users')));
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/settings', settingsRoutes);

require('./socket/sessions')(io);

const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();

  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
