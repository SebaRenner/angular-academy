import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from '../../services/user/user.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public currentProfile: User;
  private subscriptions: Subscription[] = [];
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subscriptions.push(
      Observable.combineLatest(
        this.route.params.map((params: Params) => params['profile'] as string),
        this.userService.list(),
        (viewUser: string, users: User[]) => {
          return users.find(u => u.name === viewUser);
        }
      )
      .subscribe((currentProfile: User) => this.currentProfile = currentProfile)
    );
  }

  selectProfile(user: User) {
    this.router.navigate(['profile', user.name]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
