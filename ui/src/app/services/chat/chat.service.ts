import { Injectable } from '@angular/core';
import { Message, MessageDto, mapMessage, mapMessages } from './message';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, tap } from 'rxjs';
import { User } from '../user';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

const MESSAGES_ENDPOINT = `${environment.endpoint}/messages`;
const CHAT_HUB_ENDPOINT = `${environment.endpoint}/chatHub`;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  receivedMessages: Message[] = [];

  private readonly connection = new HubConnectionBuilder()
    .withUrl(CHAT_HUB_ENDPOINT, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .build();

  constructor(private readonly http: HttpClient) {
    this.connection
      .start()
      .catch(error => console.error(error));

    this.connection.on(
      'ReceiveMessage',
      (message: MessageDto) => this.receivedMessages.push(mapMessage(message)),
    );
  }

  messages(user: User | undefined): Observable<Message[]> {
    return this.http
      .get<MessageDto[]>(`${MESSAGES_ENDPOINT}/user/${user?.name}`)
      .pipe(map(mapMessages));
  }

  list(): Observable<Message[]> {
    return this.http
      .get<MessageDto[]>(MESSAGES_ENDPOINT)
      .pipe(map(mapMessages));
  }

  add(message: Message): Observable<Message> {
    this.connection
      .invoke('SendMessage', message)
      .catch(error => console.error(error));

    return this.http
      .post<MessageDto>(MESSAGES_ENDPOINT, message)
      .pipe(
        tap(({ id }) => console.log('CharService.add', { ...message, id })),
        map(mapMessage),
      );
  }
}
