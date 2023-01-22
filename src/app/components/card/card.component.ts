import { Component, Input } from '@angular/core';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() task!:Task;

}