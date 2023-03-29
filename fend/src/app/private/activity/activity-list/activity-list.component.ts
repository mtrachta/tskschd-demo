import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/_model/activity/activity.entity';
import { ActivityService } from 'src/app/_service/activity.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  columnList: string[] = ['title', 'status', 'priority', 'category', 'startDate', 'lengthTotal', 'operations'];
  dataSource: MatTableDataSource<Activity> = new MatTableDataSource<Activity>();
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  activities!: Activity[];
  activitiesCount: number = 0;
  columns: string[][] = [
    ['Title', 'text-align: center;width: 35%', "1"],
    ['Status', 'text-align: center;width: 10%', "1"],
    ['Priority', 'text-align: center;width: 10%', "1"],
    ['Category', 'text-align: center;width: 10%', "1"],
    ['StartDate', 'text-align: center;width: 10%', "1"],
    ['StartTime', 'text-align: center;width: 10%', "1"],
    ['operations', 'width: 7%', "3"],
  ];  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: ActivityService,
  ) {
    console.log('constructor');
  }

  async ngOnInit() {
    // 
    console.log('ngOnInit');
    // 
    this.ts
      .getActivities()
      .subscribe((data: any) => {
        this.activities = data;
        this.activitiesCount = this.activities.length;
        console.log("ngOnInit.subscribe.activitys: " + JSON.stringify(this.activities) );
        console.log("ngOnInit.subscribe");
        this.dataSource = new MatTableDataSource<Activity>(this.activities);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      });
  }
  
  applyFilter(event: Event) {
    console.log('event: ' + JSON.stringify(event));
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue: ' + JSON.stringify(filterValue));
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
