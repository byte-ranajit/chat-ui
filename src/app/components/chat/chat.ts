import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { WebSocketService } from '../../services/web-socket';
import { ChatService } from '../../services/chat-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];

  sender = "alice";
  receiver = "bob";
  content = "";

  ws = new WebSocketService();

  constructor(private readonly chatService: ChatService) {}

  ngOnInit() {

    this.loadMessages();

    this.ws.connect(() => {

      this.ws.subscribeMessages((msg: Message) => {
        this.messages.push(msg);
      });

    });

  }

  loadMessages() {

    this.chatService.getInbox(this.sender)
      .subscribe(data => this.messages = data);

  }

  sendMessage() {

    const msg: Message = {
      sender: this.sender,
      receiver: this.receiver,
      content: this.content,
      id: 0
    };

    this.ws.sendMessage(msg);

    this.content = "";

  }
}
