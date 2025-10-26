import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CalendarService } from './calendar.service';

@Component({
  selector:'app-event-dialog',
  templateUrl:'./event-dialog.component.html',
  styleUrls:['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit{
  @Input() eventData:any;
  @Input() date:any;
  @Output() close = new EventEmitter();

  form:any;
  colors=['#1976d2','#43a047','#f44336','#ff9800'];

  constructor(private fb:FormBuilder, private calService:CalendarService){}

  ngOnInit(){
    this.form=this.fb.group({
      id:[this.eventData?this.eventData.id:Date.now()],
      title:[this.eventData?this.eventData.title:''],
      date:[this.date||this.eventData?.date],
      color:[this.eventData?this.eventData.color:this.colors[0]]
    });
  }

  save(){
    if(this.eventData) this.calService.updateEvent(this.form.value);
    else this.calService.addEvent(this.form.value);
    this.close.emit();
  }

  delete(){
    if(this.eventData) this.calService.deleteEvent(this.eventData.id);
    this.close.emit();
  }
}