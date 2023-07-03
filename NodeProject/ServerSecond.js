const express= require('express');
const server = express();
server.use(express.json())
server.post('/api/posts',(req,res)=>{
    const {title,value}=req.body;
    const DataJson={
        title,value,
        timestamp:Date.now()
    }
    res.sendStatus(200);
    console.log("printed OKK  "+DataJson.timestamp )
})
server.listen(8080,()=>console.log("Server Listened at 8080"))