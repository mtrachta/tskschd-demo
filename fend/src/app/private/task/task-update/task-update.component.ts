import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskPriority } from 'src/app/_model/task/task-priority.enum';
import { TaskStatus } from 'src/app/_model/task/task-status.enum';
import { TaskService } from 'src/app/_service/task.service';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';

import { Task } from 'src/app/_model/task/task.entity';
import { formatDate, registerLocaleData } from '@angular/common';

registerLocaleData(localeCs, 'cs-CZ', localeCsExtra);

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss'],
  providers: [

  ],

})
export class TaskUpdateComponent implements OnInit {

  taskStatusEnum: string[] = Object.keys(TaskStatus).filter(key => isNaN(+key));
  taskPriorityEnum: string[] = Object.keys(TaskPriority).filter(key => isNaN(+key));
  // taskCategoryEnum: string[] = Object.keys(TaskCategory).filter(key => isNaN(+key));

  task!: Task;
  rowID!: string;

  myNStart!: number;
  myNFinish!: number;

  startDate = new Date();

  form!: UntypedFormGroup;
  invalidForm!: boolean;
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';
  returnUrl!: string;

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
      taskTitle: ['', Validators.required],
      taskDescription: [''],
      taskPriority: ['', Validators.required],
      taskStatus: ['', Validators.required],
      taskCategory: ['', Validators.required],
      // taskStart: [_moment(), Validators.required],
      // taskFinish: [_moment().add(1, 'd'), Validators.required],
      taskStart: ['', Validators.required],
      taskFinish: ['', Validators.required],
      taskNote: [''],
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

      this.ts.getTask(this.rowID).subscribe((res: Task) => {
        // 
        this.task = res;
        // 
        console.log('ngOnInit.getTask: ' + JSON.stringify(this.task));
        // 
        this.f.taskTitle.setValue(this.task['title']);
        this.f.taskNote.setValue(this.task['note']);
        this.f.taskDescription.setValue(this.task['description']);

        this.f.taskStatus.setValue(this.task['status']);
        this.f.taskPriority.setValue(this.task['priority']);
        this.f.taskCategory.setValue(this.task['category']);

        this.myNStart = Number(this.task["start"]);
        this.myNFinish = Number(this.task["finish"]);
        this.f.taskStart.setValue(formatDate(this.myNStart, 'yyyy-MM-dd', 'cs-CZ'));
        this.f.taskFinish.setValue(formatDate(this.myNFinish, 'yyyy-MM-dd', 'cs-CZ'));

        // this.f.taskStart.setValue(new Date(this.myNStart));
        // this.f.taskFinish.setValue(new Date(this.myNFinish));

      }
      );
    }
    );

  }

  async onSubmit() {
    // 
    console.log('onSubmit()');
    // 
    const task = new Task();
    // 
    task.id = this.rowID;
    task.title = this.f.taskTitle.value;
    task.note = this.f.taskNote.value;
    task.description = this.f.taskDescription.value;
    task.status = this.f.taskStatus.value;
    task.priority = this.f.taskPriority.value;
    task.category = this.f.taskCategory.value;
    task.start = Date.parse(this.f.taskStart.value);
    task.finish = Date.parse(this.f.taskFinish.value);
    // 
    console.log('updateTask before save' + JSON.stringify(task));
    // 
    this.ts.updateTask(this.rowID, task)
      .subscribe((res: Task) => {
        console.log('updateTask.subscribe before route');
        // this.router.navigate(['prv/tsk']);
      });

    setTimeout(() => { this.router.navigate(['prv/tsk']); }, 800);
    // this.router.navigate(['prv/tsk']);

  }

  backToList() {
    console.log('backToList');
    this.router.navigate(['/prv/tsk']);
  }



}
