import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { MessageI } from '../../interfaces/MessageI';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  @Input() title: string = ""
  @Input() icon: string = ""
  @Input() msgs: Array<MessageI> = []

  msg: string;

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    
    const boton_bajar = document.getElementById('bajar');

    boton_bajar.addEventListener("click", this.Down);

    console.log(scroll); 

    

  }



  sendMsg() {
    const msg: MessageI = {
      content: this.msg,
      isMe: true,
      time: "8:58",
      isRead: false,
      owner: this.title
    }
    this.chatService.sendMsg(msg);
    this.msg = "";
    let scroll = document.getElementById ('chat')
    
    scroll.scrollTo({
      top:5000,
      behavior:'smooth'
    })
  }

  Down(){
    
    let scroll = document.getElementById ('chat')
    scroll.scrollTo({
      top:1000,
      behavior:'smooth'
    })

  }
}
