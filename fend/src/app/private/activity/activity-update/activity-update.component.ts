import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityPriority } from 'src/app/_model/activity/activity-priority.enum';
import { ActivityStatus } from 'src/app/_model/activity/activity-status.enum';
import { ActivityService } from 'src/app/_service/activity.service';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';

// import * as _moment from 'moment';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Activity } from 'src/app/_model/activity/activity.entity';
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
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.scss'],
  providers: [
  ],

})
export class ActivityUpdateComponent implements OnInit {

  activityStatusEnum: string[] = Object.keys(ActivityStatus).filter(key => isNaN(+key));
  activityPriorityEnum: string[] = Object.keys(ActivityPriority).filter(key => isNaN(+key));
  // activityCategoryEnum: string[] = Object.keys(ActivityCategory).filter(key => isNaN(+key));

  activity!: Activity;
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
    private ts: ActivityService,

  ) {
    // 
    console.log('constructor');
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
    // 
    console.log('ngOnInit');
    // 
    this.route.params.subscribe(params => {
      this.rowID = params['id'];
      console.log('ngOnInit.subscribe: ' + this.rowID);

      this.ts.getActivity(this.rowID).subscribe((res: Activity) => {
        // 
        this.activity = res;
        // 
        console.log('ngOnInit.getActivity: ' + JSON.stringify(this.activity));
        // 
        this.f.activityTitle.setValue(this.activity['title']);
        this.f.activityNote.setValue(this.activity['note']);
        this.f.activityDescription.setValue(this.activity['description']);

        this.f.activityStatus.setValue(this.activity['status']);
        this.f.activityPriority.setValue(this.activity['priority']);
        this.f.activityCategory.setValue(this.activity['category']);

        this.myNStart = Number(this.activity["startDate"]);
        this.f.activityStartDate.setValue(formatDate(this.myNStart, 'yyyy-MM-dd', 'cs-CZ'));
        this.f.activityStartTime.setValue(this.activity['startTime']);

        this.f.activityLengthTotal.setValue(this.activity['lengthTotal']);
        this.f.activityLengthAction.setValue(this.activity['lengthAction']);
        this.f.activityAveragePace.setValue(this.activity['averagePace']);

        this.f.activityPlace.setValue(this.activity['place']);
        this.f.activitySources.setValue(this.activity['sources']);
        this.f.activityShoes.setValue(this.activity['shoes']);

      }
      );
    }
    );

  }

  async onSubmit() {
    // 
    console.log('onSubmit()');
    // 
    const activity = new Activity();
    // 
    activity.id = this.rowID;
    activity.title = this.f.activityTitle.value;
    activity.note = this.f.activityNote.value;
    activity.description = this.f.activityDescription.value;
    activity.status = this.f.activityStatus.value;
    activity.priority = this.f.activityPriority.value;
    activity.category = this.f.activityCategory.value;
    activity.startDate = Date.parse(this.f.activityStartDate.value);
    activity.startTime = this.f.activityStartTime.value;
    activity.lengthTotal = this.f.activityLengthTotal.value;
    activity.lengthAction = this.f.activityLengthAction.value;
    activity.averagePace = this.f.activityAveragePace.value;
    activity.place = this.f.activityPlace.value;
    activity.sources = this.f.activitySources.value;
    activity.shoes = this.f.activityShoes.value;
    // 
    console.log('updateActivity before save' + JSON.stringify(activity));
    // 
    this.ts.updateActivity(this.rowID, activity)
      .subscribe((res: Activity) => {
        console.log('updateActivity.subscribe before route');
        // this.router.navigate(['prv/tsk']);
      });

    setTimeout(() => { this.router.navigate(['prv/act']); }, 800);
    // this.router.navigate(['prv/tsk']);

  }

  backToList() {
    console.log('backToList');
    this.router.navigate(['/prv/act']);
  }



}
