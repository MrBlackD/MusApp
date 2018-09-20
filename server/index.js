const express = require("express");
const fs = require("fs");

const app = express();

/**
 * middleware для установки всем ответам заголовка
 */
app.use((req,res,next)=>{
    res.set("Access-Control-Allow-Origin","*");
    next();
})
/**
 * Обработка корневого запроса
 */
app.get("/",(req,res)=>{
    res.send("Hello")
})

/**
 * Получение списка треков в директории /static/mus/
 */
app.get("/tracks",(req,res)=>{
    const dir = fs.readdirSync("./static/mus/")
    const mp3 = dir.filter(isMp3)
    res.send(mp3)
})
/**
 * Получение трека по наименованию
 */
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
/**
 * Прослушивание сервером порта 3000
 */
app.listen(3000,()=>{
    console.log("Server started at :3000")
})

/**
 * Проверка наличия в строке 
 * @param {string} fileName 
 */
const isMp3 = (fileName)=>fileName.split(".")[1]==="mp3"