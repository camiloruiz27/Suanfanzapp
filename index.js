const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
//const uuidv4 = require('uuid/v4')

const port = 3000;
const { isClassOrTypeElement } = require('typescript');
const SocketManager = require('./src/server/SocketManager')
const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
  LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
  TYPING, PRIVATE_MESSAGE,ACTIVECHAT,LISTAUSUARIOS } = require('./src/Events')
//import {ListaUsuario} from "./src/app/shared/services/chat/chat.service";
//const{ChatService}=require('./src/app/shared/services/chat/chat.service')
const { createUser, createMessage, createChat } = require('./src/Factories')

//io.on('connection', SocketManager)

let connectedUsers = { }
  
io.on('connection', (socket) => {
  console.log("Socket Id:" + socket.id);
  console.log('a user connected');
  //console.log(socket.id);
  //console.log(email);
  socket.on('UserConnected', (user)=>{
		//user.socketId = socket.id
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user
		//sendMessageToChatFromUser = sendMessageToChat(user.name)
		//sendTypingFromUser = sendTypingToChat(user.name)
		io.emit('UserConnected', connectedUsers)
		console.log(connectedUsers);

	})
 /*socket.on('newMsg', (msg) => {
    //console.log(`Imprimiendo usuarios ${ChatService.ListaUsuario}`);
    console.log(`Imprimiendo users from Socket Manager ${connectedUsers}`);
    console.log(`Emitiendo nuevo mensaje: ${msg.content}`);
    console.log(`Id de mensaje: ${msg.id}`);
    console.log(`Mensaje Para: ${msg.to}`);
    io.to(msg.to).emit('newMsg', msg);
  });*/
  socket.on('newMsg',(msg,mensaje)=>{
		if(msg.to in connectedUsers){
			const recieverSocket = connectedUsers[msg.to].id
      io.to(recieverSocket).emit(mensaje)
      console.log("Se ha enviado mensahe a: "+recieverSocket+","+msg.to)
      console.log("Se ha enviado: "+mensaje)
      console.log("mensaje from: "+msg.from)
      /*if(msg.content === null){
				//const newChat = createChat({ name:`${reciever}&${sender}`, users:[reciever, sender] })
				io.to(recieverSocket).emit(msg)
				//socket.emit(PRIVATE_MESSAGE, newChat)
			}else{
				io.to(recieverSocket).emit(msg)}*/
		}
	})

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

/*io.on('disconnect', (socket)=>{
  
    console.log("Se ha desconectado el usuario"+socket.id);
  })
  //cambios probados*/
  function addUser(userList, user){
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
  }