import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users: any[] = [];

  setData(data: any[]) {
    this.users = data;
  }

  getData() {
    return this.users;
  }

  getUser(index: number) {
    return this.users[index];
  }

}