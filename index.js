import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;
const API_URL = "http://localhost:4000";


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.get("/about", (req,res)=>{
    res.render("about.ejs");
});

app.get("/dashboard", async (req,res)=>{
    const response= await axios.get(`${API_URL}/all`);
    res.render("dashboard.ejs",{blogs : response.data});
});

app.get("/write", (req, res) => {
    const message = req.query.mes || null;
    res.render("write.ejs", { mes :message });
});

app.post("/submit", async (req,res)=>{
    const response = await axios.post(`${API_URL}/post`,req.body);
    const error=response.data;
    const errorMes=error.mes;
    if(errorMes==undefined){
        res.redirect("/dashboard");
    }else{
        res.redirect(`/write?mes=${errorMes}`);
    }
});

app.get("/mainpage", (req,res)=>{
    res.render("mainpage.ejs");
});

app.listen(port, ()=>{
    console.log(`Server is listning to ${port}`);
});
