import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotePriority } from 'src/app/_model/note/note-priority.enum';
import { NoteStatus } from 'src/app/_model/note/note-status.enum';
import { NoteService } from 'src/app/_service/note.service';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';

// import * as _moment from 'moment';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Note } from 'src/app/_model/note/note.entity';
import { formatDate, registerLocaleData } from '@angular/common';

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
  selector: 'app-note-update',
  templateUrl: './note-update.component.html',
  styleUrls: ['./note-update.component.scss'],
  providers: [
  ],

})
export class NoteUpdateComponent implements OnInit {

  noteStatusEnum: string[] = Object.keys(NoteStatus).filter(key => isNaN(+key));
  notePriorityEnum: string[] = Object.keys(NotePriority).filter(key => isNaN(+key));
  // noteCategoryEnum: string[] = Object.keys(NoteCategory).filter(key => isNaN(+key));

  note!: Note;
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
    private ts: NoteService,

  ) {
    // 
    console.log('constructor');
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
    // 
    console.log('ngOnInit');
    // 
    this.route.params.subscribe(params => {
      this.rowID = params['id'];
      console.log('ngOnInit.subscribe: ' + this.rowID);

      this.ts.getNote(this.rowID).subscribe((res: Note) => {
        // 
        this.note = res;
        // 
        console.log('ngOnInit.getNote: ' + JSON.stringify(this.note));
        // 
        this.f.noteTitle.setValue(this.note['title']);
        this.f.noteBody.setValue(this.note['body']);

        this.f.noteStatus.setValue(this.note['status']);
        this.f.notePriority.setValue(this.note['priority']);
        this.f.noteCategory.setValue(this.note['category']);
      }
      );
    }
    );

  }

  async onSubmit() {
    // 
    console.log('onSubmit()');
    // 
    const note = new Note();
    // 
    note.id = this.rowID;
    note.title = this.f.noteTitle.value;
    note.body = this.f.noteBody.value;
  
    note.status = this.f.noteStatus.value;
    note.priority = this.f.notePriority.value;
    note.category = this.f.noteCategory.value;
    // 
    console.log('updateNote before save' + JSON.stringify(note));
    // 
    this.ts.updateNote(this.rowID, note)
      .subscribe((res: Note) => {
        console.log('updateNote.subscribe before route');
        // this.router.navigate(['prv/tsk']);
      });

    setTimeout(() => { this.router.navigate(['prv/not']); }, 800);
    // this.router.navigate(['prv/tsk']);

  }

  backToList() {
    console.log('backToList');
    this.router.navigate(['/prv/not']);
  }



}
