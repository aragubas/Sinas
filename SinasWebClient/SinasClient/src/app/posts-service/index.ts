import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PostsService
{
    public postsList: Array<Post> = [ new Post("Caldo da Pilha da ceira do Sinas", "Sinas"), new Post("Pessoas de ceira tão na sua casa", "CVANC") ];
    constructor() {  }

    
}

export class Post
{
    public content: string = "";
    public author: string = "";
    public likeCount: number = 666;
    public postDate: number = Date.now();

    constructor(content: string, author: string)
    {
        this.content = content;
        this.author = author;
    }
}
