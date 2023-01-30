import { Component, Input } from '@angular/core';
import { Task } from './../../model/task.model';
import { TaskService } from './../../services/task.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

  @Input() taskList!:Task[];

  dialog = false;

  taskDelete!:Task;

  constructor(private taskService: TaskService){}

  toggleDialog(){
    this.dialog = !this.dialog;
  }

  dialogBox(task:Task){
    this.toggleDialog();
    this.taskDelete = task;
  }

  delete(){
    this.taskService.deleteTask(this.taskDelete);
    this.toggleDialog();
  }

}











