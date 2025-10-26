import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  daysInMonth:any[]=[];
  events:any[]=[];

  selectedEvent:any=null;
  showDialog=false;
  selectedDate:any;

  constructor(private calService: CalendarService){}

  ngOnInit(){
    this.loadDays();
    this.calService.getEvents().subscribe(res=>{
      this.events = res;
    });
  }

  loadDays(){
    let d = new Date(this.currentYear,this.currentMonth+1,0);
    this.daysInMonth = Array.from({length:d.getDate()},(_,i)=>i+1);
  }

  prevMonth(){
    if(this.currentMonth==0){
      this.currentMonth=11; this.currentYear--;
    }else this.currentMonth--;
    this.loadDays();
  }

  nextMonth(){
    if(this.currentMonth==11){
      this.currentMonth=0; this.currentYear++;
    }else this.currentMonth++;
    this.loadDays();
  }

  openAdd(day:any){
    this.selectedDate = `${this.currentYear}-${this.currentMonth+1}-${day}`;
    this.selectedEvent=null;
    this.showDialog=true;
  }

  openEdit(ev:any){
    this.selectedEvent=ev;
    this.showDialog=true;
  }

  closeDialog(){
    this.showDialog=false;
  }

  getEventsForDate(day:any){
    let date = `${this.currentYear}-${this.currentMonth+1}-${day}`;
    return this.events.filter(e=>e.date==date);
  }
}