import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'to-do-list';

  task = new FormControl('',[Validators.required, Validators.minLength(28)]);

  showTask:string = '';

  ngOnInit(){
    this.task.valueChanges.subscribe( value => {
      value ? this.showTask = value : this.showTask = '';
    });
  }

  addTask(){
    if(this.task.valid){
      // codigo
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
















