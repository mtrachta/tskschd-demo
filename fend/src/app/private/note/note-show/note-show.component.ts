import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/_service/note.service';
import { Note } from 'src/app/_model/note/note.entity';
import { formatDate } from '@angular/common';

// import * as _moment from 'moment';

export interface SimpleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-note-show',
  templateUrl: './note-show.component.html',
  styleUrls: ['./note-show.component.scss']
})
export class NoteShowComponent implements OnInit {

  note!: Note;
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
    private ts: NoteService,
  ) {
    // 
    console.log('constructor');
    // 
    this.form = this.fb.group({
      noteTitle: ['', Validators.required],
      noteBody: [''],
      notePriority: [''],
      noteStatus: [''],
      noteCategory: [''],
      noteCreated: [''],
      noteUpdated: [''],
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

      this.ts.getNote(params['id']).subscribe((res: Note) => {
        // 
        this.note = res;
        // 
        console.log('ngOnInit.getNote: ' + JSON.stringify(this.note));
        // 
        this.f.noteTitle.setValue(this.note["title"]);
        this.f.noteBody.setValue(this.note["body"]);

        this.f.noteStatus.setValue(this.note["status"]);
        this.f.notePriority.setValue(this.note["priority"]);
        this.f.noteCategory.setValue(this.note["category"]);

        this.f.noteUpdated.setValue(this.note['updated']);
        this.f.noteCreated.setValue(this.note['created']);

      });

    });
    // 
  }

  // onSubmit() {}

  backToList() {
    console.log("route backToList");
    this.router.navigate(['prv/not']);
  }
  backToUpdateNote() {
    console.log("route to updateNote");
    const pom = '/prv/not/upd/' + this.note.id;
    this.router.navigate([pom]);
  }
  backToDeleteNote() {
    console.log("route to deleteNote");
    const pom = '/prv/not/del/' + this.note.id;
    this.router.navigate([pom]);
  }

}
