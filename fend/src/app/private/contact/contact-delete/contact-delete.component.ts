import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/_service/contact.service';

// import * as _moment from 'moment';
import { Contact } from 'src/app/_model/contact/contact.entity';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.scss']
})
export class ContactDeleteComponent implements OnInit {

  form!: UntypedFormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';
  invalidForm!: boolean;

  contact!: Contact;
  rowID!: string;

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
      this.ts.getContact(params['id']).subscribe((res: Contact) => {
        this.contact = res;
        console.debug(`ngOnInit.getContact: ${this.contact}`);
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
  // 
  async onSubmit() {

    console.log("onSubmit.this.contact.id: " + this.contact.id);

    this.ts.deleteContact(this.contact.id)
      .subscribe((res: any) => {
        console.log('deleteContact.subscribe.before route');
        // this.router.navigate(['/prv/cnt']);
      });

    setTimeout(() => { this.router.navigate(['prv/cnt']); }, 800);

  }
  // 
  backToList() {
    console.log("route backToList");
    this.router.navigate(['prv/cnt']);
  }
  // 
  backToUpdateContact() {
    console.log("route to updateContact");
    const pom = '/prv/tsk/upd/' + this.contact.id;
    this.router.navigate([pom]);
  }

}
