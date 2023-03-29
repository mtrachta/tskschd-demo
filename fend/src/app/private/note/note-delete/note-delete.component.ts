import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/_service/note.service';

// import * as _moment from 'moment';
import { Note } from 'src/app/_model/note/note.entity';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.scss']
})
export class NoteDeleteComponent implements OnInit {

  form!: UntypedFormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  error: string = '';
  invalidForm!: boolean;

  note!: Note;
  rowID!: string;

  // myNStart!: number;
  // myNFinish!: number;

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
      this.ts.getNote(params['id']).subscribe((res: Note) => {
        this.note = res;
        console.debug(`ngOnInit.getNote: ${this.note}`);
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
  // 
  async onSubmit() {

    console.log("onSubmit.this.note.id: " + this.note.id);

    this.ts.deleteNote(this.note.id)
      .subscribe((res: any) => {
        console.log('deleteNote.subscribe.before route');
        // this.router.navigate(['/prv/not']);
      });

    setTimeout(() => { this.router.navigate(['prv/not']); }, 800);

  }
  // 
  backToList() {
    console.log("route backToList");
    this.router.navigate(['prv/not']);
  }
  // 
  backToUpdateNote() {
    console.log("route to updateNote");
    const pom = '/prv/not/upd/' + this.note.id;
    this.router.navigate([pom]);
  }

}
