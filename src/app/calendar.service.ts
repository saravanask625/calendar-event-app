import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn:'root'})
export class CalendarService {
  private events$ = new BehaviorSubject<any[]>(this.loadEvents());

  getEvents(){
    return this.events$.asObservable();
  }

  addEvent(event:any){
    let all = this.loadEvents();
    all.push(event);
    this.saveEvents(all);
    this.events$.next(all);
  }

  updateEvent(event:any){
    let all = this.loadEvents();
    const i = all.findIndex(e=> e.id===event.id);
    if(i!=-1){
      all[i]=event;
      this.saveEvents(all);
      this.events$.next(all);
    }
  }

  deleteEvent(id:number){
    let all = this.loadEvents().filter(e=> e.id!==id);
    this.saveEvents(all);
    this.events$.next(all);
  }

  private loadEvents(){
    return JSON.parse(localStorage.getItem('myEvents') || '[]');
  }

  private saveEvents(events:any[]){
    localStorage.setItem('myEvents', JSON.stringify(events));
  }
}