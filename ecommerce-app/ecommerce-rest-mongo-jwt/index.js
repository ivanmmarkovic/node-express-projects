const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/User');
const authRouter = require('./routes/Auth');
const productRouter = require('./routes/Product');
const cartRouter = require('./routes/Cart');
const orderRouter = require('./routes/Order');

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('DB connection successfull'))
    .catch(err => console.log(err));


app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));