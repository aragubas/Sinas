import { style, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upvote-downvote-component',
  templateUrl: './upvote-downvote-component.component.html',
  styleUrls: ['./upvote-downvote-component.component.css'],
})
export class UpvoteDownvoteComponentComponent implements OnInit {
  @Output() resultEvent = new EventEmitter<number>();
  vote: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  voteResult(result: number)
  {
    // Check if vote result is valid.
    if (result < 0 || result > 1)
    { 
      console.error(`upvote-downvote-component: Invalid vote result \"${result}\"`); 
      return; 
    }

    this.vote = result;
    this.resultEvent.emit(result);
  }

}
