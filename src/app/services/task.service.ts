import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  tasklist: Task[] = [];

  constructor() {
    this.getAllTask();
  }

  addTask(task:Task) {
    this.tasklist.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasklist));
  }

  getAllTask(): Observable<Task[]>{
    const tasks = localStorage.getItem('tasks');
    this.tasklist = tasks ? JSON.parse(tasks) : [];
    return of(this.tasklist);
  }






}






