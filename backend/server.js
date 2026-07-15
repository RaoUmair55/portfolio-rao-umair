import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import chatRouter from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting for Chat API
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per `window`
  message: { error: 'Too many requests, please try again later.' }
});

// Routes
app.use('/api/chat', chatLimiter, chatRouter);

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio AI Assistant is running.' });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
