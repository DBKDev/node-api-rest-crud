const express = require('express');
const app = express();
const port = 8080;
const cors = require ('cors');
const UserModule = require ('./Modules/UsersModule.js')
const PostModule = require ('./Modules/PostModule.js')
const CommentModule = require ('./Modules/CommentModule.js')

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Ynov!');
});

app.use("/users", UserModule);
app.use("/posts", PostModule);
app.use("/comments", CommentModule);

app.listen(port, () => {
    console.log("Node App est lancé");
});
