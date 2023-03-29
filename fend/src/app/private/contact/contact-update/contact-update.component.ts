import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactPriority } from 'src/app/_model/contact/contact-priority.enum';
import { ContactStatus } from 'src/app/_model/contact/contact-status.enum';
import { ContactService } from 'src/app/_service/contact.service';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';

import { Contact } from 'src/app/_model/contact/contact.entity';
import { formatDate, registerLocaleData } from '@angular/common';
import { ContactTitle } from 'src/app/_model/contact/contact-title.enum';

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
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.scss'],
  providers: [
  ],

})
export class ContactUpdateComponent implements OnInit {

  contactStatusEnum: string[] = Object.keys(ContactStatus).filter(key => isNaN(+key));
  ContactTitleEnum: string[] = Object.keys(ContactTitle).filter(key => isNaN(+key));
  // contactCategoryEnum: string[] = Object.keys(ContactCategory).filter(key => isNaN(+key));

  contact!: Contact;
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
    private ts: ContactService,

  ) {
    // 
    console.log('constructor');
    // 
    this.form = this.fb.group({
      contactTitle: ['', Validators.required],
      contactFirstName: [''],
      contactLastName: ['', Validators.required],

      contactEmail: [''],
      contactPhone: [''],

      contactPosition: [''],
      contactOrganisation: [''],

      contactStatus: ['', Validators.required],
      contactCategory: [''],

      contactNote: [''],

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

      this.ts.getContact(this.rowID).subscribe((res: Contact) => {
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

      }
      );
    }
    );

  }

  async onSubmit() {
    // 
    console.log('onSubmit()');
    // 
    const contact = new Contact();
    // 
    contact.id = this.rowID;
    // 
    contact.title = this.f.contactTitle.value;
    contact.firstname = this.f.contactFirstName.value;
    contact.lastname = this.f.contactLastName.value;
    // 
    contact.email = this.f.contactEmail.value;
    contact.phone = this.f.contactPhone.value;
    // 
    contact.position = this.f.contactPosition.value;
    contact.organisation = this.f.contactOrganisation.value;
    // 
    contact.status = this.f.contactStatus.value;
    contact.category = this.f.contactCategory.value;
    // 
    contact.note = this.f.contactNote.value;
    // 
    console.log('updateContact before save' + JSON.stringify(contact));
    // 
    this.ts.updateContact(this.rowID, contact)
      .subscribe((res: Contact) => {
        console.log('updateContact.subscribe before route');
        // this.router.navigate(['prv/cnt']);
      });

    setTimeout(() => { this.router.navigate(['prv/cnt']); }, 800);
    // this.router.navigate(['prv/cnt']);

  }

  backToList() {
    console.log('backToList');
    this.router.navigate(['/prv/cnt']);
  }



}
