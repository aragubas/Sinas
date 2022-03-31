import { User } from "@prisma/client";

export default class AuthUser {
  username: string;
  email: string;
  id: string;

  constructor(User: User) {
    this.username = User.username;
    this.email = User.email;
    this.id = User.id;
  }
}
