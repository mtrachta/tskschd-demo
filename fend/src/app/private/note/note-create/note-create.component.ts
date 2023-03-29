//import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotePriority } from '../../../_model/note/note-priority.enum';
import { NoteStatus } from '../../../_model/note/note-status.enum';
import { Note } from '../../../_model/note/note.entity';
import { NoteService } from '../../../_service/note.service';

// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// import * as _moment from 'moment';

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
  selector: 'app-notes-insert',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    // {
    // provide: DateAdapter,
    // useClass: MomentDateAdapter,
    // deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },

    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NoteCreateComponent implements OnInit {

  NoteStatusEnum: string[] = Object.keys(NoteStatus).filter(key => isNaN(+key));
  NotePriorityEnum: string[] = Object.keys(NotePriority).filter(key => isNaN(+key));
  // NoteCategoryEnum: string[] = Object.keys(NoteCategory).filter(key => isNaN(+key));

  Note!: Note;

  form!: any;
  id!: string;
  invalidForm!: boolean;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ts: NoteService,
    //private dp: DatePipe,
  ) {
    // 
    console.debug('constructor');
    // 
    this.form = this.fb.group({
      noteTitle: ['', Validators.required],
      noteBody: [''],
      notePriority: ['', Validators.required],
      noteStatus: ['', Validators.required],
      noteCategory: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  async ngOnInit() {

    console.log("ngOnInit()");

    this.f.noteTitle.setValue('');
    this.f.noteBody.setValue('');
    this.f.noteStatus.setValue('NEW');
    this.f.notePriority.setValue('LOW');
    this.f.noteCategory.setValue('');
  }

  async onSubmit() {
    // 
    console.debug('onSubmit()');
    // 
    if (this.form.valid) {
      console.debug('onSubmit().form => valid');
      this.Note = new Note();

      this.Note.title = this.f.noteTitle.value;
      this.Note.body = this.f.noteBody.value;

      this.Note.status = this.f.noteStatus.value;
      this.Note.priority = this.f.notePriority.value;
      this.Note.category = this.f.noteCategory.value;

      this.ts.createNote(this.Note)
        .subscribe((res: any) => {
          console.log('onSubmit.subscribe');
          this.router.navigate(['/prv/not']);
        });

    } else {
      console.debug('onSubmit().form => invalid');
      this.submitted = true;

    }

  }

  backToList() {
    console.log('backToList');
    this.router.navigate(['/prv/not']);
  }

}
