import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() task!:Task;
  @Output() deleteEvent = new EventEmitter<Task>();

  dragStartHandler(e:DragEvent) {
    if(e.dataTransfer){
      e.dataTransfer.effectAllowed = 'move';
    }
    e.dataTransfer?.setData('text/plain', JSON.stringify(this.task));
  }

  dragEndHandler(e:DragEvent){
  }

  delete(){
    this.deleteEvent.emit(this.task);
  }

}
