import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/_service/task.service';

// import * as _moment from 'moment';
import { Task } from 'src/app/_model/task/task.entity';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.scss']
})
export class TaskDeleteComponent implements OnInit {

  form!: UntypedFormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';
  invalidForm!: boolean;

  task!: Task;
  rowID!: string;

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
      this.ts.getTask(params['id']).subscribe((res: Task) => {
        this.task = res;
        console.debug(`ngOnInit.getTask: ${this.task}`);
        this.f.taskTitle.setValue(this.task["title"]);
        this.f.taskNote.setValue(this.task["note"]);
        this.f.taskDescription.setValue(this.task["description"]);

        this.f.taskStatus.setValue(this.task["status"]);
        this.f.taskPriority.setValue(this.task["priority"]);
        this.f.taskCategory.setValue(this.task["category"]);

        this.myNStart = Number(this.task["start"]);
        this.myNFinish = Number(this.task["finish"]);
        // this.f.taskStart.setValue(_moment(this.myNStart).format('DD.MM.YYYY'));
        // this.f.taskFinish.setValue(_moment(this.myNFinish).format('DD.MM.YYYY'));
        this.f.taskStart.setValue(formatDate(this.myNStart, 'dd.MM.YYYY', 'en-US'));
        this.f.taskFinish.setValue(formatDate(this.myNFinish, 'dd.MM.YYYY', 'en-US'));
        this.f.taskUpdated.setValue(this.task['updated']);
        this.f.taskCreated.setValue(this.task['created']);
      });
    });
    // 
  }
  // 
  async onSubmit() {

    console.log("onSubmit.this.task.id: " + this.task.id);

    this.ts.deleteTask(this.task.id)
      .subscribe((res: any) => {
        console.log('deleteTask.subscribe.before route');
        // this.router.navigate(['/prv/tsk']);
      });

    setTimeout(() => { this.router.navigate(['prv/tsk']); }, 800);

  }
  // 
  backToList() {
    console.log("route backToList");
    this.router.navigate(['prv/tsk']);
  }
  // 
  backToUpdateTask() {
    console.log("route to updateTask");
    const pom = '/prv/tsk/upd/' + this.task.id;
    this.router.navigate([pom]);
  }

}
