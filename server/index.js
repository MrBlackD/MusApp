const express = require("express");
const fs = require("fs");

const app = express();

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/tracks",(req,res)=>{
    const dir = fs.readdirSync("./static/mus/")
    const mp3 = dir.filter(isMp3)
    res.send(mp3)
})

app.get("/tracks/:name",(req,res)=>{
    const fileName = req.params.name;
    if(isMp3(fileName)){
        res.sendFile(__dirname+"/static/mus/"+fileName,{},(err)=>{
            if(err){
                console.log("File "+fileName+" not found")
                res.send("File "+fileName+" not found")
            }else{
                console.log("File sent:",fileName)
            }
        });
    }else{
        res.status(400).send("Bad request");
    }
})

app.listen(3000,()=>{
    console.log("Server started at :3000")
})


const isMp3 = (fileName)=>fileName.split(".")[1]==="mp3"