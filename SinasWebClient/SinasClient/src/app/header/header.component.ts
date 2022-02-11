import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification-service';
import { UserService } from '../user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(public NotificationService: NotificationService, public UserService: UserService) { }

  ngOnInit(): void { }
  
}
