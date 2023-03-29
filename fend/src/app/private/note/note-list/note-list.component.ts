import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from 'src/app/_model/note/note.entity';
import { NoteService } from 'src/app/_service/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  columnList: string[] = ['title', 'status', 'priority', 'category', 'operations'];

  dataSource: MatTableDataSource<Note> = new MatTableDataSource<Note>();
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  notes!: Note[];
  notesCount: number = 0;
  columns: string[][] = [
    ['Title', 'text-align: center;width: 55%', "1"],
    ['Status', 'text-align: center;width: 15%', "1"],
    ['Priority', 'text-align: center;width: 15%', "1"],
    ['Category', 'text-align: center;width: 15%', "1"],
    ['operations', 'width: 7%', "3"],
  ];  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: NoteService,
  ) {
    console.log('constructor');
  }

  async ngOnInit() {
    // 
    console.log('ngOnInit');
    // 
    this.ts
      .getNotes()
      .subscribe((data: any) => {
        this.notes = data;
        this.notesCount = this.notes.length;
        console.log("ngOnInit.subscribe.notes: " + JSON.stringify(this.notes) );
        console.log("ngOnInit.subscribe");
        this.dataSource = new MatTableDataSource<Note>(this.notes);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      });
  }
  
  applyFilter(event: Event) {
    console.log('event: ' + JSON.stringify(event));
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue: ' + JSON.stringify(filterValue));
    this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  }

}
