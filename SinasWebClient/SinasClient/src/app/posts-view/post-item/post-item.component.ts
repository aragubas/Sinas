import { Component, Input, OnInit } from '@angular/core';
import { Post, PostsService } from 'src/app/posts-service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input() post!: Post;
  postDateConverted: string = "Loading..."

  constructor(public postService: PostsService) { }

  ngOnInit(): void {
    this.postDateConverted = new Date(this.post.postDate).toLocaleString();
  }

}
