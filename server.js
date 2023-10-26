const express = require('express')
const connectToMongo = require('./db')
connectToMongo();
const Newcontact = require("./models/contact")
const articles = require("./models/articles")
const app = express()
const PORT = process.env.PORT || 8000;

const articlesInfo ={
    "learn-react":{
        comments: [],
    }, 
    "learn-node":{
        comments: [],
    },
    "my-thoughts-on-learning-react":{
        comments: [],
    }
}
 



//initialization of middleware
//we use to have to install body parser but now it is built in middleware
// function of express. It parses the incoming JSON playload
app.use(express.json({extended: false}));


app.get("/api/articles/:name", async (req, res)=>{
    try {
        const articleName = req.params.name;
        const articleInfo = await articles.findOne({ name: articleName })
        res.status(200).json(articleInfo);
    } catch (error) {
        res.status(500).json({message:"Error connecting to database", error });
    }
});

app.post("/api/articles/:name", async(req, res)=>{
    const {name, comment}= req.body;
    const newarticle = new articles({name, comment});
    await newarticle.save();
}) 

app.get("/", (req, res)=>{
    res.send("Hello World");
})
 
app.post('/api/articles/:name/add-comments', async (req, res)=>{
    const {username, text} = req.body;
    const articleName = req.params.name;

    const articleInfo = await articles.findOne({ name: articleName}) ;

    await articles.updateOne(
        { name: articleName},
        {
            $set: {
                comment: articleInfo.comment.concat({ username, text}),
            },
        }
    );

    const updateArticleInfo = await articles.findOne({name: articleName});
    res.status(200).json(updateArticleInfo);


    // const newcom = new Newcontact({articlename, comment});
    // console.log(newcom);
});

app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`));