import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { NotificationService } from '../notification-service';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css'],
  animations: 
  [
    trigger("openClose", [
      state("open", style({
        transform: "scaleY(100%) rotateX(0deg)",
        opacity: 1

      })),
      
      state("close", style({
          transform: "scaleY(0%) rotateX(-80deg)",
          opacity: 0
      })),
      transition("open => close", [
        animate('0.15s')
      ])
    ])
  ]
})
export class NotificationItemComponent implements OnInit {
  @Input() index: number = -1;
  @Input() text: string = "test";
  @Input() count: number = 1;
  @Output() isClosingEvent = new EventEmitter<number>();
  isClosing: boolean = false;

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  animEnd(): void
  {
    if (this.isClosing)
    {
      this.notificationService.notifications.forEach((notification, index) => 
      {
        if (notification.text == this.text)
        {
            this.notificationService.notifications.splice(index, 1);
        }
      })
    }
  }
 
  remove(): void
  {
    this.isClosing = true;
    this.isClosingEvent.emit(this.index);
  }
}
