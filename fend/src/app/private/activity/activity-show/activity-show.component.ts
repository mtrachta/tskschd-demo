import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/_service/activity.service';
import { Activity } from 'src/app/_model/activity/activity.entity';
import { formatDate } from '@angular/common';

// import * as _moment from 'moment';

export interface SimpleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-activity-show',
  templateUrl: './activity-show.component.html',
  styleUrls: ['./activity-show.component.scss']
})
export class ActivityShowComponent implements OnInit {

  activity!: Activity;
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
      activityCreated: [''],
      activityUpdated: [''],

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

      this.ts.getActivity(params['id']).subscribe((res: Activity) => {
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
        this.f.activityCreated.setValue(this.activity['created']);
        this.f.activityUpdated.setValue(this.activity['updated']);

      });

    });
    // 
  }

  // onSubmit() {}

  backToList() {
    console.log("route backToList");
    this.router.navigate(['prv/act']);
  }
  backToUpdateActivity() {
    console.log("route to updateActivity");
    const pom = '/prv/act/upd/' + this.activity.id;
    this.router.navigate([pom]);
  }
  backToDeleteActivity() {
    console.log("route to deleteActivity");
    const pom = '/prv/act/del/' + this.activity.id;
    this.router.navigate([pom]);
  }

}
