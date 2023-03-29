import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/_service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  columnList: string[] = ['title', 'status', 'priority', 'category', 'start', 'finish', 'operations'];

  dataSource = new MatTableDataSource<Task>();
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tasks!: Task[];
  tasksSorted!: Task[];

  tasksCount: number = 0;
  columns: string[][] = [
    ['Title', 'text-align: center;width: 35%', "1"],
    ['Status', 'text-align: center;width: 10%', "1"],
    ['Priority', 'text-align: center;width: 10%', "1"],
    ['Category', 'text-align: center;width: 10%', "1"],
    ['Start', 'text-align: center;width: 10%', "1"],
    ['Finish', 'text-align: center;width: 10%', "1"],
    ['operations', 'width: 7%', "3"],
  ];  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: TaskService,
  ) {
    console.log('constructor');
  }

  async ngOnInit() {
    // 
    console.log('ngOnInit');
    // 
    this.ts
      .getTasks()
      .subscribe((data: any) => {
        this.tasks = data;
        this.tasksCount = this.tasks.length;
        console.log("ngOnInit.subscribe.tasks: " + JSON.stringify(this.tasks) );
        console.log("ngOnInit.subscribe");
        this.dataSource = new MatTableDataSource<Task>(this.tasks);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      });
  }
  
  applyFilter(event: Event) {
    console.log('event: ' + JSON.stringify(event));
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue: ' + JSON.stringify(filterValue));
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

}
