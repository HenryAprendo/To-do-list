import { Component, Input } from '@angular/core';
import { Task } from './../../model/task.model';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

  @Input() taskList!:Task[];

}
