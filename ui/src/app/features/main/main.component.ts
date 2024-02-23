import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserService, ChatService, User, Message } from 'src/app/services';

interface Item {
  id: string,
  value: string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  items$: Observable<Item[]>;

  constructor(readonly  userService: UserService, readonly chatService: ChatService) { }

  listUsers() {
    this.items$ = this.userService.list()
    .pipe(
      map(this.mapItems),
    );
  }

  listMessages() {
    this.items$ = this.chatService.list()
    .pipe(
      map(this.mapItems),
    );
  }

  mapItems(items: User[] | Message[]): Item[] {
    return items.map(item => ({ id: item.id ?? '', value: JSON.stringify(item) }));
  }

  trackById(_: number, item: Item) {
    return item.value;
  }
}
