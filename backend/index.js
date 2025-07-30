const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./Routes/post.route');
const userRoutes = require('./Routes/user.route');
const dotenv = require('dotenv');
const {errorHandler} = require('./MiddleWares/error.middleware');
const app = express();
dotenv.config({path: './config.env'});
app.use(express.json());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use(errorHandler);
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT,"0.0.0.0",()=>{
        console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
        console.log(`Local access: http://127.0.0.1:${process.env.PORT}`);
        console.log(`Network access: http://[YOUR_IP]:${process.env.PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});