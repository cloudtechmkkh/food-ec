import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.routes';
// import ordersRoutes from './routes/orders.routes';
// import subscriptionsRoutes from './routes/subscriptions.routes';
// import adminRoutes from './routes/admin.routes';
// import authRoutes from './routes/auth.routes';
// import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/delivery_labels', express.static('delivery_labels'));

// Routes
app.use('/api/products', productsRoutes);
// app.use('/api/orders', ordersRoutes);
// app.use('/api/subscriptions', subscriptionsRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/auth', authRoutes);

// Error handler
// app.use(errorHandler);

app.listen(5000, () => {
    console.log('ポート5000でサーバーが起動しました');
})

export default app;