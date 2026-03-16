import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  API = "http://localhost:8080/messages";

  constructor(private readonly http: HttpClient) {}

  sendMessage(message: Message) {
    return this.http.post<Message>(`${this.API}/send`, message);
  }

  getInbox(user: string) {
    return this.http.get<Message[]>(`${this.API}/inbox/${user}`);
  }
}
