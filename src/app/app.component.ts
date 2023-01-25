import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators } from '@angular/forms';
import { Task } from './model/task.model';
import { TaskService } from './services/task.service';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'to-do-list';

  listTask: Task[] = [];

  proccessTask: Task[] = [];

  pendingTask: Task[] = [];

  finalizeTask: Task[] = [];

  task = new FormControl('',[Validators.required, Validators.maxLength(28)]);

  showTask:string = '';

  constructor(private taskService: TaskService){ }

  ngOnInit(){

    this.taskService.getAllTask()
      .subscribe( data => {
        this.listTask = data;
      });

    this.task.valueChanges.subscribe( value => {
      value ? this.showTask = value : this.showTask = '';
    });
  }

  addTask(){
    if(this.task.valid){

      let task:Task = {
        id: uuidv4() ,
        title: this.task.value!,
        state: 'initial',
        date: new Date
      }

      this.taskService.addTask(task);
      this.task.setValue('');

    }
    else {
      this.task.markAllAsTouched;
    }
  }

  get fieldValid(){
    return this.task.valid && this.task.touched;
  }

  get fieldInvalid(){
    return this.task.invalid && this.task.touched;
  }

  //se ejecuta cuando se suelta un elemento --evento drop
  dropHandler(e:DragEvent){
    e.preventDefault();
    let data = e.dataTransfer?.getData('text/plain')!;
    let task = JSON.parse(data)
    let area = e.target as HTMLElement;
    let nameArea = area.dataset['zone'];

    switch(nameArea){

      case "list" :
        this.listTask.push(task);
        break;

      case "proccess":
        this.proccessTask.push(task);
        break;

      case "pending":
        this.pendingTask.push(task);
        break;

      case "finalize":
        this.finalizeTask.push(task);
        break;

    }

  }

  //se ejecuta cuando se esta sobre la zona drog --event dragover
  dragOverHandler(e:DragEvent) {
    e.preventDefault();
  }

  //se ejecuta al entrar el elemento arrastrado sobre la zona de caida del objeto
  dragEnterHandler(e:DragEvent) {
    e.preventDefault();
    if(e.dataTransfer){
      e.dataTransfer.dropEffect = "move";
    }
  }

}
















