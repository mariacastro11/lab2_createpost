const express = require ("express")
const cors = require ("cors")
const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000
const posts = [
    {
        title: "Post 1",
        img_url: "https://i.pinimg.com/736x/32/10/f7/3210f71a49ab88084937e62438d56247.jpg",
        description: "post 1 description",
        id: 0
    
    }
]
app.get("/posts",(req,res)=>{
    res.send(posts);
})

app.post("/post",(req,res)=>{
    const {title,img_url,description} = req.body;
    if (posts == 0){
        const newPost ={
            id:0,
            title,
            img_url,
            description
        }
        posts.push(newPost);
        res.send(posts);
    } else {
        const newPost ={
            id:posts[posts.length-1].id + 1, 
            title,
            img_url,
            description,
    };
        posts.push(newPost);
        res.send(posts);
    }
  });

  app.delete("/post/:id",(req,res)=>{
    const id = req.params.id;
    const postfind = posts.find(post => post.id == parseInt(id));
    posts.splice(postfind,1);
    res.send("Post eliminado");
  })

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:3000/`);
})