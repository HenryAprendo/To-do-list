import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  constructor(
    private taskService: TaskService,
    private render: Renderer2
  ){ }

  ngOnInit(){

    this.taskService.taskNotify.subscribe( data => {
      this.listTask = data;
    });

    this.taskService.proccessNotify.subscribe( data => {
      this.proccessTask = data;
    });

    this.taskService.pendingNotify.subscribe( data => {
      this.pendingTask = data;
    });

    this.taskService.finalizeNotify.subscribe( data => {
      this.finalizeTask = data;
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
    let task:Task = JSON.parse(data)
    let area = e.target as HTMLElement;
    let nameArea = area.dataset['zone'];

    this.taskService.deleteTask(task);

    switch(nameArea){

      case "list" :
        task.state = 'initial';
        this.taskService.addTask(task);
        break;

      case "proccess":
        task.state = 'process';
        this.taskService.addTask(task);
        break;

      case "pending":
        task.state = 'pending';
        this.taskService.addTask(task);
        break;

      case "finalize":
        task.state = 'finalize';
        this.taskService.addTask(task);
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

    const el = e.target as HTMLElement;
    // this.render.addClass(el,'border-red-400');
    // this.render.addClass(el,'border-2');
  }

  dragleaveHandler(){
    // console.log('leave');
  }

}
















