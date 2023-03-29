import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../_model/note/note.entity';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';
import { Card } from '../_model/card/card.entity';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient,
    private err: ErrorService,
  ) {
    console.log('constructor');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getNotes(): Observable<Note[]> { 
    // 
    console.log("getNotes - START");
    // 
    return this.http.get<Note[]>(`${environment.apiUrl}/note`)
      .pipe(
        tap(_ => console.log('fetched notes')),
        catchError(this.err.handleError<Note[]>('getNotes', []))
      );
    // 
  };

  getNoteCount(): Observable<Card> {
    // 
    console.log("getNoteCount - START");
    // 
    // return this.http.get<any>(`${environment.apiUrl}/task/count`);
    console.log(`count path: ${environment.apiUrl}/note/count`);
    // 
    return this.http.get<Card>(`${environment.apiUrl}/note/count`, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched note count')),
      catchError(this.err.handleError<Card>('getNoteCount'))
    );
  }


  getNote(id: string): Observable<Note> {
    // 
    console.log("getNote(id) - START: " + JSON.stringify(id));
    // 
    return this.http.get<Note>(`${environment.apiUrl}/note/${id}`)
      .pipe(
        tap(_ => console.log(`fetched note id=${id}`)),
        catchError(this.err.handleError<Note>(`getNote id=${id}`))
      );
    // 
  }

  createNote(note: Note): Observable<Note> {
    // 
    console.log("createNote(note) - START: " + JSON.stringify(note));
    // 
    return this.http.post<Note>(`${environment.apiUrl}/note`, note, this.httpOptions)
    .pipe(
      tap((newNote: Note) => console.log(`created note w/ id=${newNote.id}`)),
      catchError(this.err.handleError<Note>('createNote'))
    );
    // 
  }

  /** PATCH: update the hero on the server */
  updateNote(id: string, note: Note): Observable<Note> {
    // 
    console.log("notes service - update note - id: " + JSON.stringify(id)); 
    console.log("notes service - update note - note: " + JSON.stringify(note));
    // 
    return this.http.patch(`${environment.apiUrl}/note/${id}`, note, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated note id=${note.id}`)),
      catchError(this.err.handleError<any>('updateNote'))
    );  
    // 
  }

  /** DELETE: delete the note from the server */
  deleteNote(id: string): Observable<any> {
    // 
    console.log("deleteNote(id) - START: " + JSON.stringify(id));
    // 
    return this.http.delete(`${environment.apiUrl}/note/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted note id=${id}`)),
      catchError(this.err.handleError<Note>('deleteNote'))
    );
    // 
  }

} 
