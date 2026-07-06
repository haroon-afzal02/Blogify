require("dotenv").config();

const express = require('express');
const path = require('path');
const connectDB = require('./connection');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const cookieParser = require('cookie-parser');
const { checkForAuthentication } = require('./middlewares/auth');

const Blog = require('./models/blog')

const app = express();
const PORT = process.env.PORT;

connectDB(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB connected')
})


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication('token'));
app.use(express.static(path.resolve(`./public`)))

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
})
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})