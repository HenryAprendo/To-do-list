import { Injectable } from '@angular/core';
import { BehaviorSubject, findIndex } from 'rxjs';
import { Status, Task } from './../model/task.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasklist: Task[] = [];
  proccessTask: Task[] = [];
  pendingTask: Task[] = [];
  finalizeTask: Task[] = [];

  task$ = new BehaviorSubject<Task[]>([]);
  taskNotify = this.task$.asObservable();

  proccess$ = new BehaviorSubject<Task[]>([]);
  proccessNotify = this.proccess$.asObservable();

  pending$ = new BehaviorSubject<Task[]>([]);
  pendingNotify = this.pending$.asObservable();

  finalize$ = new BehaviorSubject<Task[]>([]);
  finalizeNotify = this.finalize$.asObservable();

  constructor(private http: HttpService) {
    this.getAllTask();
  }

  deleteTask(task:Task){

    const id = task.id;
    const state = task.state;

    if(state === 'initial'){
      const index = this.tasklist.findIndex(task => task.id === id);
      this.tasklist.splice(index, 1);
      this.http.post('tasks', this.tasklist);
    }

    if(state === 'process'){
      const index = this.proccessTask.findIndex(task => task.id === id);
      this.proccessTask.splice(index, 1);
      this.http.post('tasksProccess', this.proccessTask);
    }

    if(state === 'pending'){
      const index = this.pendingTask.findIndex(task => task.id === id);
      this.pendingTask.splice(index, 1);
      this.http.post('tasksPending', this.pendingTask);
    }

    if(state === 'finalize'){
      const index = this.finalizeTask.findIndex(task => task.id === id);
      this.finalizeTask.splice(index, 1);
      this.http.post('tasksFinalize', this.finalizeTask);
    }
  }

  addTask(task:Task) {
    if(task.state === 'initial'){
      this.tasklist.push(task);
      this.http.post('tasks', this.tasklist);
    }

    if (task.state === 'process'){
      this.proccessTask.push(task);
      this.http.post('tasksProccess', this.proccessTask);
    }

    if (task.state === 'pending'){
      this.pendingTask.push(task);
      this.http.post('tasksPending', this.pendingTask);
    }

    if(task.state === 'finalize'){
      this.finalizeTask.push(task);
      this.http.post('tasksFinalize', this.finalizeTask);
    }
  }

  states: string[] = ['tasks','tasksProccess','tasksPending','tasksFinalize'];

  getAllTask(){
    this.states.forEach(key => {
      this.http.get(key).subscribe(data => {
        switch(key){
          case 'tasks':
            this.tasklist = data;
            this.task$.next(this.tasklist);
            break;
          case 'tasksProccess':
            this.proccessTask = data;
            this.proccess$.next(this.proccessTask);
            break;
          case 'tasksPending':
            this.pendingTask = data;
            this.pending$.next(this.pendingTask);
            break;
          case 'tasksFinalize':
            this.finalizeTask = data;
            this.finalize$.next(this.finalizeTask);
            break;

        };
      });
    });
  };

}














