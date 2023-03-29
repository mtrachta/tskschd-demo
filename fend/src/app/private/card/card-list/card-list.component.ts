import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/_model/card/card.entity';
import { ActivityService } from 'src/app/_service/activity.service';
import { ContactService } from 'src/app/_service/contact.service';
import { NoteService } from 'src/app/_service/note.service';
import { TaskService } from 'src/app/_service/task.service';

@Component({
  selector: 'card',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  taskCount!: Card;
  contactCount!: Card;
  activityCount!: Card;
  noteCount!: Card;

  constructor(
    public ts: TaskService,
    public cs: ContactService,
    public acs: ActivityService,
    public ns: NoteService,
  ) {
    console.debug('constructor');
  }

  ngOnInit(): void {
    console.debug('ngOnInit');
    this.countRows();
  }

  countRows() {
    this.ts.getTaskCount().subscribe((res) => {this.taskCount = res; console.log('taskCount='+this.taskCount);});
    this.cs.getContactCount().subscribe((res) => {this.contactCount = res;});
    this.acs.getActivityCount().subscribe((res) => {this.activityCount = res;});
    this.ns.getNoteCount().subscribe((res) => {this.noteCount = res;});
  }

}
