import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/_service/task.service';
import { Task } from 'src/app/_model/task/task.entity';
import { formatDate } from '@angular/common';

// import * as _moment from 'moment';

export interface SimpleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.scss']
})
export class TaskShowComponent implements OnInit {

  task!: Task;
  rowID!: string; 

  form!: UntypedFormGroup;
  invalidForm!: boolean;
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';
  returnUrl!: string;

  pomDate!: Date;
  pomString!: string;

  myNStart!: number;
  myNFinish!: number;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ts: TaskService,
  ) {
    // 
    console.log('constructor');
    // 
    this.form = this.fb.group({
      taskTitle: [''],
      taskDescription: [''],
      taskPriority: [''],
      taskStatus: [''],
      taskCategory: [''],
      taskStart: [''],
      taskFinish: [''],
      taskNote: [''],
      taskCreated: [''],
      taskUpdated: [''],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  async ngOnInit() {
    // 
    console.log('ngOnInit');
    // 
    this.route.params.subscribe(params => {
      this.rowID = params['id'];
      console.log('ngOnInit.subscribe: ' + this.rowID);

      this.ts.getTask(params['id']).subscribe((res: Task) => {
        // 
        this.task = res;
        // 
        console.log('ngOnInit.getTask: ' + JSON.stringify(this.task));
        // 
        this.f.taskTitle.setValue(this.task["title"]);
        this.f.taskNote.setValue(this.task["note"]);
        this.f.taskDescription.setValue(this.task["description"]);

        this.f.taskStatus.setValue(this.task["status"]);
        this.f.taskPriority.setValue(this.task["priority"]);
        this.f.taskCategory.setValue(this.task["category"]);

        this.myNStart = Number(this.task["start"]);
        this.myNFinish = Number(this.task["finish"]);
        this.f.taskStart.setValue(formatDate(this.myNStart, 'dd.MM.YYYY', 'en-US'));
        this.f.taskFinish.setValue(formatDate(this.myNFinish, 'dd.MM.YYYY', 'en-US'));

        this.f.taskUpdated.setValue(this.task['updated']);
        this.f.taskCreated.setValue(this.task['created']);

      });

    });
    // 
  }

  // onSubmit() {}

  backToList() {
    console.log("route backToList");
    this.router.navigate(['prv/tsk']);
  }
  backToUpdateTask() {
    console.log("route to updateTask");
    const pom = '/prv/tsk/upd/' + this.task.id;
    this.router.navigate([pom]);
  }
  backToDeleteTask() {
    console.log("route to deleteTask");
    const pom = '/prv/tsk/del/' + this.task.id;
    this.router.navigate([pom]);
  }

}
