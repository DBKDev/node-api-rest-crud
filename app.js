const express = require('express');
const app = express();
const port = 8080;
const cors = require ('cors');
const UserModule = require ('./Modules/UsersModule.js')
const PostModule = require ('./Modules/PostModule.js')
const CommentModule = require ('./Modules/CommentModule.js')
const authRoutes = require('./routes/auth.routes')
const checkToken = require('./middlewares/checkTokenMiddleware')

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello Ynov!');
});

app.use("/users", checkToken ,UserModule);
app.use("/posts", PostModule);
app.use("/comments", CommentModule);

app.listen(port, () => {
    console.log("Node App est lancé");
});
