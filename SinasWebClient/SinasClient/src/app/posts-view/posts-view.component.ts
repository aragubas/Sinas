import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts-service';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.css']
})
export class PostsViewComponent implements OnInit {

  constructor(public PostService: PostsService) { }

  ngOnInit(): void {
  }

}
