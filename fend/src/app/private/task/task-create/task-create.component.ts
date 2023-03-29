import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskPriority } from 'src/app/_model/task/task-priority.enum';
import { TaskStatus } from 'src/app/_model/task/task-status.enum';
import { TaskService } from 'src/app/_service/task.service';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';

// import * as _moment from 'moment';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
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
  selector: 'app-tasks-insert',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    // {
    // provide: DateAdapter,
    // useClass: MomentDateAdapter,
    // deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },

    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TaskCreateComponent implements OnInit {

  taskStatusEnum: string[] = Object.keys(TaskStatus).filter(key => isNaN(+key));
  taskPriorityEnum: string[] = Object.keys(TaskPriority).filter(key => isNaN(+key));
  // taskCategoryEnum: string[] = Object.keys(TaskCategory).filter(key => isNaN(+key));

  task!: Task;

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
    //private dp: DatePipe,
  ) {
    //
    console.debug('constructor');
    //
    this.form = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: [''],
      taskPriority: ['', Validators.required],
      taskStatus: ['', Validators.required],
      taskCategory: [''],
      taskStart: ['', Validators.required],
      taskFinish: ['', Validators.required],
      taskNote: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  async ngOnInit() {

    console.log("ngOnInit()");

    this.f.taskTitle.setValue('');
    this.f.taskNote.setValue('');
    this.f.taskDescription.setValue('');
    this.f.taskStatus.setValue('NEW');
    this.f.taskPriority.setValue('LOW');
    this.f.taskCategory.setValue('');
    this.f.taskStart.setValue(formatDate(Date.now(), 'yyyy-MM-dd', 'cs-CZ'));
    this.f.taskFinish.setValue(formatDate(Date.now() + 86400000, 'yyyy-MM-dd', 'cs-CZ'));
    //
  }

  async onSubmit() {
    //
    console.debug('onSubmit()');
    //
    if (this.form.valid) {
      console.debug('onSubmit().form => valid');
      this.task = new Task();

      this.task.title = this.f.taskTitle.value;
      this.task.note = this.f.taskNote.value;
      this.task.description = this.f.taskDescription.value;

      this.task.status = this.f.taskStatus.value;
      this.task.priority = this.f.taskPriority.value;
      this.task.category = this.f.taskCategory.value;

      this.task.start = Date.parse(this.f.taskStart.value);
      this.task.finish = Date.parse(this.f.taskFinish.value);

      this.ts.createTask(this.task)
        .subscribe((res: any) => {
          console.log('onSubmit.subscribe');
          this.router.navigate(['/prv/tsk']);
          // setTimeout(() => { this.router.navigate(['prv/tsk']); }, 800);
        });

    } else {
      console.debug('onSubmit().form => invalid');
      this.submitted = true;

    }

  }

  backToList() {
    console.log('backToList');
    this.router.navigate(['/prv/tsk']);
  }

}
