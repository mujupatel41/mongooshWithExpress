const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

main().then(()=>{
    console.log("Connection Sucessfull");
}).catch((err)=>{ console.log(err) });

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"));

const Chat = require("./models/chats");

// let chat1 = new Chat({
//     from: "abhi",
//     to: "manav",
//     msg: "Hello Manav How Are you my brother",
//     created_at: new Date(),
// });

// chat1.save();

app.get("/", (req, res)=>{
    res.send("Hii")
});

// Index Route

app.get("/chats", async (req, res)=>{
    // Chat.find().then((data) =>{
    //     res.render("index.ejs", {data});
    // });
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
})

// New Route

app.get("/chats/new", (req, res)=>{
    res.render("new.ejs");
});

// Create Route

app.post("/chats", (req, res)=>{
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat.save().then((res)=>{
        console.log(res)
    }).catch(err =>{ console.log(err)});
    res.redirect("/chats");
});

// Edit Route

app.get("/chats/:id/edit", async (req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
    
});

// Update Route

app.put("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg : newMsg, updated_at: new Date()}, {runValidators: true, new: true});
    res.redirect("/chats")
});

//Destroy Route

app.delete("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});


app.listen(port, ()=>{
    console.log(`Port listening ${port}`);
});
