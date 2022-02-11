import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '../notification-service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css'],
  animations: [
    trigger("openClose", [
      state("open", style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      
      state("close", style({
        transform: 'translateY(-50%)',
        opacity: 0
      })),

      transition("open <=> close", [
        animate('0.25s')
      ]),

    ])
  ]
})
export class NotificationCenterComponent implements OnInit {
  close: boolean = false;
  private closeWait: NodeJS.Timeout | undefined;

  constructor(public NotificationService: NotificationService) { }

  ngOnInit(): void {
  }

  trackby(index: number, el: Notification): string
  {    
    return el.text;
  }
  
  animDone(): void
  {
    if (this.close)
    {
      this.NotificationService.notifications.splice(0, this.NotificationService.notifications.length);

      this.closeWait = setInterval(() =>{
        this.close = false;

      }, 1000)
    }

  }

  deleteAll(): void
  {
    if (this.closeWait != undefined) { clearInterval(this.closeWait); }
    this.close = true;

  }
}
