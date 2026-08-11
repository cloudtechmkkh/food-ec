import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.routes';
import ordersRoutes from './routes/orders.routes';
import subscriptionsRoutes from './routes/subscriptions.routes';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// Error handler
app.use(errorHandler);

export default app;