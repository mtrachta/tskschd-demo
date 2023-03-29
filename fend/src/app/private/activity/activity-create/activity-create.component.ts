//import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityPriority } from '../../../_model/activity/activity-priority.enum';
import { ActivityStatus } from '../../../_model/activity/activity-status.enum';
import { Activity } from '../../../_model/activity/activity.entity';
import { ActivityService } from '../../../_service/activity.service';

import * as moment from 'moment';

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
  selector: 'app-activitys-insert',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss'],
  providers: [
  ],
})
export class ActivityCreateComponent implements OnInit {

  ActivityStatusEnum: string[] = Object.keys(ActivityStatus).filter(key => isNaN(+key));
  ActivityPriorityEnum: string[] = Object.keys(ActivityPriority).filter(key => isNaN(+key));
  // ActivityCategoryEnum: string[] = Object.keys(ActivityCategory).filter(key => isNaN(+key));

  Activity!: Activity;

  form!: any;
  id!: string;
  invalidForm!: boolean;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ts: ActivityService,
    //private dp: DatePipe,
  ) {
    // 
    console.debug('constructor');
    // 
    this.form = this.fb.group({

      activityTitle: ['', Validators.required],
      activityDescription: [''],
      activityPriority: ['', Validators.required],
      activityStatus: ['', Validators.required],
      activityCategory: [''],
      activityStartDate: ['', Validators.required],
      activityStartTime: [''],
      activityLengthTotal: [''],
      activityLengthAction: [''],
      activityPlace: [''],
      activitySources: [''],
      activityAveragePace: [''],
      // activityAveragePaceSec: [''],
      activityShoes: [''],
      activityNote: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  async ngOnInit() {

    console.log("ngOnInit()");

    this.f.activityTitle.setValue('');
    this.f.activityNote.setValue('');
    this.f.activityDescription.setValue('');
    this.f.activityStatus.setValue('NEW');
    this.f.activityPriority.setValue('LOW');
    this.f.activityCategory.setValue('');
    this.f.activityStartDate.setValue(formatDate(Date.now(), 'YYYY-MM-dd', 'cs-CZ'));
    this.f.activityStartTime.setValue('');
    this.f.activityLengthTotal.setValue('');
    this.f.activityLengthAction.setValue('');
    this.f.activityPlace.setValue('Průhonice');
    this.f.activitySources.setValue('láhev vody');
    this.f.activityAveragePace.setValue('');
    // this.f.activityAveragePaceSec.setValue('0');
    this.f.activityShoes.setValue('Mizumo');

  }

  async onSubmit() {
    // 
    console.debug('onSubmit()');
    // 
    if (this.form.valid) {
      console.debug('onSubmit().form => valid');
      this.Activity = new Activity();

      this.Activity.title = this.f.activityTitle.value;
      this.Activity.note = this.f.activityNote.value;
      this.Activity.description = this.f.activityDescription.value;

      this.Activity.status = this.f.activityStatus.value;
      this.Activity.priority = this.f.activityPriority.value;
      this.Activity.category = this.f.activityCategory.value;

      console.log('startDate: ' + Date.parse(this.f.activityStartDate.value));
      this.Activity.startDate = Date.parse(this.f.activityStartDate.value);

      console.log('startTime: ' + this.f.activityStartTime.value);
      this.Activity.startTime = this.f.activityStartTime.value;

      console.log('lengthTotal: ' + JSON.stringify(this.f.activityLengthTotal.value));
      this.Activity.lengthTotal = this.f.activityLengthTotal.value;

      console.log('lengthAction: ' + this.f.activityLengthAction.value);
      this.Activity.lengthAction = this.f.activityLengthAction.value;

      this.Activity.place = this.f.activityPlace.value;
      this.Activity.sources = this.f.activitySources.value;

      console.log('averagePace: ' + this.f.activityAveragePace.value);
      this.Activity.averagePace = this.f.activityAveragePace.value
      this.Activity.shoes = this.f.activityShoes.value;

      this.ts.createActivity(this.Activity)
        .subscribe((res: any) => {
          console.log('onSubmit.subscribe');
          this.router.navigate(['/prv/act']);
        });

    } else {
      console.debug('onSubmit().form => invalid');
      this.submitted = true;

    }

  }

  backToList() {
    console.log('backToList');
    this.router.navigate(['/prv/act']);
  }

}
