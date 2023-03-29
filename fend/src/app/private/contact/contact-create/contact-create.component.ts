  //import { DatePipe } from '@angular/common';
  import { Component, OnInit } from '@angular/core';

  import { UntypedFormBuilder, /* FormControl, FormGroup, */ Validators } from '@angular/forms';
  import { /* ActivatedRoute, */ Router } from '@angular/router';
import { ContactTitle } from 'src/app/_model/contact/contact-title.enum';
  // import { ContactPriority } from '../../../_model/contact/contact-priority.enum';
  import { ContactStatus } from '../../../_model/contact/contact-status.enum';
  import { Contact } from '../../../_model/contact/contact.entity';
  import { ContactService } from '../../../_service/contact.service';
  
  @Component({
    selector: 'app-contacts-insert',
    templateUrl: './contact-create.component.html',
    styleUrls: ['./contact-create.component.scss'],
    providers: [
    ],
  })
  export class ContactCreateComponent implements OnInit {
  
    ContactStatusEnum: string[] = Object.keys(ContactStatus).filter(key => isNaN(+key));
    ContactTitleEnum: string[] = Object.keys(ContactTitle).filter(key => isNaN(+key));
  
    Contact!: Contact;
  
    form!: any;
    id!: string;
    invalidForm!: boolean;
    loading: boolean = false;
    submitted: boolean = false;
    returnUrl!: string;
  
    constructor(
      private fb: UntypedFormBuilder,
      // private route: ActivatedRoute,
      private router: Router,
      private ts: ContactService,
      //private dp: DatePipe,
    ) {
      // 
      console.debug('constructor');
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
  
      console.log("ngOnInit()");
      console.debug('titles: ' + JSON.stringify(this.ContactTitleEnum));
  
      this.f.contactTitle.setValue('NOTITLE');
      this.f.contactFirstName.setValue('');
      this.f.contactLastName.setValue('');

      this.f.contactEmail.setValue('');
      this.f.contactPhone.setValue('');

      this.f.contactPosition.setValue('');
      this.f.contactOrganisation.setValue('');

      this.f.contactStatus.setValue('NEW');
      this.f.contactCategory.setValue('');  

      this.f.contactNote.setValue('');

    }
  
    async onSubmit() {
      // 
      console.debug('onSubmit()');
      // 
      if (this.form.valid) {
        console.debug('onSubmit().form => valid');
        this.Contact = new Contact();
  
        this.Contact.title = this.f.contactTitle.value;
        this.Contact.firstname = this.f.contactFirstName.value;
        this.Contact.lastname = this.f.contactLastName.value;

        this.Contact.email = this.f.contactEmail.value;
        this.Contact.phone = this.f.contactPhone.value;
        
        this.Contact.position = this.f.contactPosition.value;
        this.Contact.organisation = this.f.contactOrganisation.value;

        this.Contact.status = this.f.contactStatus.value;
        this.Contact.category = this.f.contactCategory.value;

        this.Contact.note = this.f.contactNote.value;

        this.ts.createContact(this.Contact)
        .subscribe((res: any) => {
          console.log('onSubmit.subscribe');
          this.router.navigate(['/prv/cnt']);
        });
  
      } else {
        console.debug('onSubmit().form => invalid');
        this.submitted = true;
  
      }
  
    }
  
    backToList() {
      console.log('backToList');
      this.router.navigate(['/prv/cnt']);
    }
  
  }