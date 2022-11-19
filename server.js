const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();

mongoose.connect("mongodb+srv://lakshya:lakshya32@cluster0.j4bbomb.mongodb.net/flamesDB",{useNewUrlParser:true});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));

const flamesSchema=new mongoose.Schema({
    name1: String,
    name2: String,
    output: String
});

const flames=mongoose.model("flames",flamesSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body);
    const data=new flames({
        name1:req.body.name1,
        name2:req.body.name2,
        output:req.body.output
    });
    data.save();
    res.sendFile(__dirname +"/index.html");
});

app.listen(3000,function(){
    console.log("Server started");
});