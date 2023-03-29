import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/_model/contact/contact.entity';
import { ContactService } from 'src/app/_service/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  columnList: string[] = [
    'title',
    'firstname',
    'lastname',
    'status',
    'category',
    'email',
    'phone',
    'operations'
  ];

  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>();
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  contacts!: Contact[];
  contactsCount: number = 0;
  columns: string[][] = [
    ['First name', 'text-align: left;width: 10%', "1"],
    ['Last name', 'text-align: left;width: 15%', "1"],
    ['Status', 'text-align: center;width: 10%', "1"],
    ['Category', 'text-align: center;width: 15%', "1"],
    ['Email', 'text-align: left;width: 15%', "1"],
    ['Phone', 'text-align: left;width: 15%', "1"],
    ['operations', 'width: 7%', "3"],
  ];  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: ContactService,
  ) {
    console.log('constructor');
  }

  async ngOnInit() {
    // 
    console.log('ngOnInit');
    // 
    this.ts
      .getContacts()
      .subscribe((data: any) => {
        this.contacts = data;
        this.contactsCount = this.contacts.length;
        console.log("ngOnInit.subscribe.contacts: " + JSON.stringify(this.contacts) );
        console.log("ngOnInit.subscribe");
        this.dataSource = new MatTableDataSource<Contact>(this.contacts);
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
