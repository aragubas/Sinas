import { Injectable } from "@angular/core";

@Injectable ({ providedIn: "root" })
export class NotificationService
{
    constructor() { }

    public notifications: Array<Notification> = [ ];

    addNotification(content: string): void
    {
        let notificationFound = false;

        this.notifications.forEach((notification, index) => {
        if (notification.text == content)
        {
            notification.count++;
            notificationFound = true;
        }
        })

        if (notificationFound) { return; }

        this.notifications.push(new Notification(content));
    }

}

export class Notification
{
    public text: string = "";
    public count: number = 1;
    
    constructor(text: string)
    {
        this.text = text;
    }  
}