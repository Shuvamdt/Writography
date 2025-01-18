import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts=[
    {
        id:0,
        name:"Shuvam",
        content:"Hello everyone, myself shuvam, I created this website to enjoy writing",
        date:new Date().toUTCString(),
    }
];

let lastId = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/all", (req, res) => {
    res.json(posts);
});
app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.json(posts[id]);
});
app.post("/post", (req, res) => {
    const content = req.body.content;
    const author = req.body.name;
    const post = {
    id: lastId + 1,
    content: content,
    name: author,
    date: new Date().toISOString(),
    };
    if (content.length > 100) {
        return res.json({mes : "Content exceeds the 100-word limit."});
    } else if (content.length <= 0) {
        return res.json({mes:"Content cannot be empty."});
    } else if (author.length <= 0) {
        return res.json({mes:"You must enter your name."});
    }else{
        posts.push(post);
        lastId++;
        res.json(post);
    }
});
app.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existingPost = posts.find((post) => post.id === id);
    const newPost = {
    id: id,
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: new Date().toISOString(),
    };
    const postId = posts.findIndex((post) => post.id === id);
    posts[postId] = newPost;
    res.json(newPost);
});
app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.json(posts.splice(id, 1));
    
});
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
