import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/_service/activity.service';

// import * as _moment from 'moment';
import { Activity } from 'src/app/_model/activity/activity.entity';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-activity-delete',
  templateUrl: './activity-delete.component.html',
  styleUrls: ['./activity-delete.component.scss']
})
export class ActivityDeleteComponent implements OnInit {

  form!: UntypedFormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';
  invalidForm!: boolean;

  activity!: Activity;
  rowID!: string;

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
      this.ts.getActivity(params['id']).subscribe((res: Activity) => {
        this.activity = res;
        console.debug(`ngOnInit.getActivity: ${this.activity}`);
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
  // 
  async onSubmit() {

    console.log("onSubmit.this.activity.id: " + this.activity.id);

    this.ts.deleteActivity(this.activity.id)
      .subscribe((res: any) => {
        console.log('deleteActivity.subscribe.before route');
        // this.router.navigate(['/prv/tsk']);
      });

    setTimeout(() => { this.router.navigate(['prv/act']); }, 800);

  }
  // 
  backToList() {
    console.log("route backToList");
    this.router.navigate(['prv/act']);
  }
  // 
  backToUpdateActivity() {
    console.log("route to updateActivity");
    const pom = '/prv/act/upd/' + this.activity.id;
    this.router.navigate([pom]);
  }

}
