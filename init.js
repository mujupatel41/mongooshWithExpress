const mongoose = require("mongoose");

let Chat = require("./models/chats");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

main().then(()=>{
    console.log("Connection Sucsessfull")
}).catch((err)=>{console.log(err)})

let allChats = [{
    from: "Neha",
    to: "Naina",
    msg: "Send Me Your Exam Sheet",
    created_at: new Date()
    },
{
    from: "mohit",
    to: "rohit",
    msg: "teach me JS callbacks",
    created_at: new Date()
},
{
    from: "amit",
    to: "sumit",
    msg: "All The Best",
    created_at: new Date()
},
{
    from: "anita",
    to: "ramesh",
    msg: "bring me some fruits",
    created_at: new Date()
},
{
    from: "tony",
    to: "peter",
    msg: "love you 3000",
    created_at: new Date()
}
];


Chat.insertMany(allChats);
