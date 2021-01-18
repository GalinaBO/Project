const express=require("express");
const app=express();
const bodyParser = require('body-parser');

// Return static page - index.html
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const countriesArr=require("./countries.json");

for(let i=0; i<countriesArr.length; i++){
    countriesArr[i]["counter"]=0;
}


app.get("/api/info",(req,res)=>{
    res.status(200);
    res.send(countriesArr);
})

app.put("/api/edit/:name",(req,res)=>{
    let country=countriesArr.find(e=>e.name==req.params.name);

    if(country){
        country.counter=req.body.counter;
        res.status(200);
        res.send({"message":"success"});
    }
    else{
        res.status(400);
        res.send({"message":"failed"}); 
    }

})

app.listen(process.env.PORT, ()=>{console.log("Ok")});