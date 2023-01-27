import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }


  get(key:string): Observable<Task[]>{
    const data = localStorage.getItem(key);
    const response: Task[] = data ? JSON.parse(data) : [];
    return of(response);
  }

  post(key:string, task:Task[]){
    localStorage.setItem(key,JSON.stringify(task));
  }


}
















