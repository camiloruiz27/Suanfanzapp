import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { MessageI } from 'src/app/pages/private/home/interfaces/MessageI';
import { MessagePrivate } from 'src/app/pages/private/home/interfaces/MessagePrivate';
import { NewUsers } from 'src/app/shared/interfaces/NewUser';

import{HomeComponent} from 'src/app/pages/private/home/home.component'
import { LISTAUSUARIOS } from '../../../../../src/Events'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: any;
  identificacion:any;
  identificadormio:any;
  email:any;
  contenido:any
  idenfiticacionMensaje:any;

  ListaUsuarios=[{}];
  constructor() { }
 
  connect() {
    console.log("me conecte perros")
    return new Observable(observer => {
      this.socket = io('http://localhost:3000');
      this.socket.on('connect', () => {
        this.identificadormio=this.socket.id;
        this.ListaUsuarios.push(this.email,this.identificadormio);
        console.log("Lista de Usuarios "+this.ListaUsuarios);
        //LISTAUSUARIOS.push(this.ListaUsuarios)
        observer.next();
        let enviar: NewUsers = {
          id:this.identificadormio,
          name:this.email
        }
        this.EnviarUsuario(enviar);
      })
    })
    
  }
  
  idenificadorId(identificador:string){
    /*return new Observable(observer => {
      this.socket.on("who", msg => {
        observer.next(msg);
      });
    });*/
    this.identificacion=identificador
    console.log("Identificaden la Funcion Identificador:" +identificador);
    console.log("Lista en La funcion identificador: "+this.ListaUsuarios);
  }
  EnviarUsuario(recibido:NewUsers){
    let usuerio: NewUsers = {
      id:recibido.id,
      name:recibido.name
    }
    this.socket.emit('UserConnected',usuerio);
  }
  IdUsuario(email:string){
    console.log()
    this.email=email;
    console.log("Ha iniciado sesion " +email);
    //({user:this.createUser({name:email, socketId:this.identificadormio})})
    //this.ListaUsuarios.push(email,this.identificadormio);
    
  }
  getNewMsgs() {
    return new Observable(observer => {
      this.socket.on("newMsg", mensaje => {

        observer.next(mensaje);
      });
    });
  }

  sendMsg(msg: MessageI) {
    this.contenido=msg.content;
    this.idenfiticacionMensaje=msg.id
    this.envioMensaje(msg)
    //this.socket.emit('newMsg', msg); 
  }
  envioMensaje(mensaje:MessageI){
    let sms: MessagePrivate = {
      id:this.idenfiticacionMensaje,
      to:this.identificadormio,
      from:this.identificadormio
    }
    sms.id=mensaje.id;
    sms.to=this.identificacion;
    sms.from=this.identificadormio

    console.log(sms)
    this.socket.emit('newMsg',sms,mensaje);
  }

  disconnect() {
    this.socket.disconnect();
    console.log("Se ha desconectado el usuario"+this.identificadormio)
  }

}

//Asegurando main
//realizando el merge con el main