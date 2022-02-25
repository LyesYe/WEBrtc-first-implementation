const express = require('express')
const app = express()
const server = require('http').Server(app) //create a server and allow it to be used with socket.io
const io = require('socket.io')(server) // create a server based on express server , and pass it to socket io so that socket io knows which server
const { v4: uuidV4 } = require('uuid') //uuidV4 creates a random unique id



app.use(express.json());

app.set('view engine','ejs')
app.use(express.static('public'))


//redirecting the home page to a /:room page where room is uuid
app.get('/',(req,res) => {
    res.redirect(`/${uuidV4()}`)
})

//room page
app.get('/:room',(req,res) => {
    res.render('room', { roomId: req.params.room})
})

//whenever we connect with socket io we gonna set up this event listener
io.on('connection',socket => {
    //whenever we join a room  , pass the user and room id and execute the code
    socket.on('join-room',(roomId,userId)=> {
        socket.join(roomId); //joining the room with this current user
        socket.to(roomId).emit('user-connected', userId); //send a msg to all connected user  the room except me
        
        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
          })

    });
} );

server.listen(3000)