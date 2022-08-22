const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const path = require('path');
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const socket = require('socket.io')
const createUserRoutes = require('./routes/createUserRoutes')
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoute')
const createServerRoute = require('./routes/createServerRoute')
const {userJoin} = require('./utils/users');
app.use((cors()))
app.use(express.json())
app.use(morgan('dev'))
app.use('/auth', createUserRoutes)
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api', userRoutes)
app.use('/api', createServerRoute)
app.use('/api', messagesRoute)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", true); 
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});


app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('DB Connection Succesfull');
    })
    .catch((err) => {
        console.log(err.message)
    })

    const server = app.listen(process.env.PORT, () => {
      console.log(`Server Started on Port ${process.env.PORT}`)
  })



const io = socket(server, {
    cors: {
        origin:'http://localhost:5001',
        credentials: true,
    },
})

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("joinRoom", ({username, room}) => {
    
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)
   
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        'has joined the chat'
      )
  });

  socket.on('send-server-msg', ({from,to, msg,username}) => {
    
    const message = [username, msg]
    socket.broadcast.to(to).emit('msg-recieve-server', message)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});