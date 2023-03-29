import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/_service/contact.service';
import { Contact } from 'src/app/_model/contact/contact.entity';
import { formatDate } from '@angular/common';

// import * as _moment from 'moment';

export interface SimpleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
  styleUrls: ['./contact-show.component.scss']
})
export class ContactShowComponent implements OnInit {

  contact!: Contact;
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
    private ts: ContactService,
  ) {
    // 
    console.log('constructor');
    // 
    this.form = this.fb.group({
      contactTitle: [''],
      contactFirstName: [''],
      contactLastName: ['', Validators.required],

      contactEmail: ['', Validators.required],
      contactPhone: ['', Validators.required],

      contactPosition: [''],
      contactOrganisation: [''],

      contactStatus: ['', Validators.required],
      contactCategory: [''],

      contactNote: [''],

      contactCreated: [''],
      contactUpdated: [''],

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

      this.ts.getContact(params['id']).subscribe((res: Contact) => {
        // 
        this.contact = res;
        // 
        console.log('ngOnInit.getContact: ' + JSON.stringify(this.contact));
        // 
        this.f.contactTitle.setValue(this.contact['title']);
        this.f.contactFirstName.setValue(this.contact['firstname']);
        this.f.contactLastName.setValue(this.contact['lastname']);

        this.f.contactEmail.setValue(this.contact['email']);
        this.f.contactPhone.setValue(this.contact['phone']);

        this.f.contactPosition.setValue(this.contact['position']);
        this.f.contactOrganisation.setValue(this.contact['organisation']);

        this.f.contactStatus.setValue(this.contact['status']);
        this.f.contactCategory.setValue(this.contact['category']);

        this.f.contactNote.setValue(this.contact['note']);

        this.f.contactUpdated.setValue(this.contact['updated']);
        this.f.contactCreated.setValue(this.contact['created']);
        // 
      });

    });
    // 
  }

  // onSubmit() {}

  backToList() {
    console.log("route backToList");
    this.router.navigate(['prv/cnt']);
  }
  backToUpdateContact() {
    console.log("route to updateContact");
    const pom = '/prv/cnt/upd/' + this.contact.id;
    this.router.navigate([pom]);
  }
  backToDeleteContact() {
    console.log("route to deleteContact");
    const pom = '/prv/cnt/del/' + this.contact.id;
    this.router.navigate([pom]);
  }

}
