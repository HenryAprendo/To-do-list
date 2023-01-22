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
      console.log(task);
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


}
















