import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

@NgModule({
  declarations: [AppComponent, EventDialogComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }