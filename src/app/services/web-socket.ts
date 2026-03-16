import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  stompClient: any;

  connect(callback: any){
      const socket = new WebSocket('ws://localhost:8080/chat');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, ()=> {
          callback();
      });
  }

  subscribeMessages(callback: any) {
    this.stompClient.subscribe('/user/queue/messages', (msg: any) => {
      callback(JSON.parse(msg.body));
    });
  }

  subscribeTyping(callback: any) {
    this.stompClient.subscribe('/user/queue/typing', (msg: any) => {
      callback(JSON.parse(msg.body));
    });
  }

  sendMessage(message: any) {
    this.stompClient.send(
      "/app/chat.send",
      {},
      JSON.stringify(message)
    );
  }

  sendTyping(event: any) {
    this.stompClient.send(
      "/app/chat.typing",
      {},
      JSON.stringify(event)
    );
  }

}
