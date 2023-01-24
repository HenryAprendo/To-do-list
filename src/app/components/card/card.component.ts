import { Component, Input } from '@angular/core';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() task!:Task;

  dragStartHandler(e:DragEvent) {
    if(e.dataTransfer){
      e.dataTransfer.effectAllowed = 'move';
    }
    e.dataTransfer?.setData('text/plain', JSON.stringify(this.task));
  }

  dragEndHandler(e:DragEvent){
    let element = e.target as HTMLElement;
    // element.remove();
  }

}
