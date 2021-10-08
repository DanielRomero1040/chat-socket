const express = require("express");
const app = express();
const router = require("./routes/index")

const msn = [
    {
        nombre: "Daniel",
        msn: "hola pimpollo electrico!!"
    }

]


//servidor http
const http = require("http");
const server = http.createServer(app);
//puerto
const port = process.env.PORT || 3005

// estaticos
app.use(express.static(__dirname + "/public"));

//routes

app.use("/api", router)

// servidor de socket
const {Server} = require("socket.io");
const io = new Server(server);

io.on("connection", (socket)=>{
     console.log("ususario conectado!")
     socket.emit("message_back",msn)
     socket.on("message client", (data)=>{
        console.log(data)
     })

     socket.on("data_client", (data)=>{
        console.log(data)

        msn.push(data)
        console.log(msn)
        //socket.emit("message_back", msn)
        io.sockets.emit("message_back", msn)
     })
});



server.listen(port, ()=>{
    console.log("server run on port " + port)
})