import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../_model/contact/contact.entity';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';
import { Card } from '../_model/card/card.entity';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    private err: ErrorService,
  ) {
    console.log('constructor');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getContacts(): Observable<Contact[]> { 
    // 
    console.log("getContacts - START");
    // return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { username, password })
    return this.http.get<Contact[]>(`${environment.apiUrl}/contact`)
      .pipe(
        tap(_ => console.log('fetched contacts')),
        catchError(this.err.handleError<Contact[]>('getContacts', []))
      );
    // 
  };

  getContactCount(): Observable<Card> {
    // 
    console.log("getContactCount - START");
    // 
    // return this.http.get<any>(`${environment.apiUrl}/task/count`);
    console.log(`count path: ${environment.apiUrl}/contact/count`);
    // 
    return this.http.get<Card>(`${environment.apiUrl}/contact/count`, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched contact count')),
      catchError(this.err.handleError<Card>('getContactCount'))
    );
  }

  getContact(id: string): Observable<Contact> {
    // 
    console.log("getContact(id) - START: " + JSON.stringify(id));
    // ${environment.apiUrl}/contact
    return this.http.get<Contact>(`${environment.apiUrl}/contact/${id}`)
      .pipe(
        tap(_ => console.log(`fetched contact id=${id}`)),
        catchError(this.err.handleError<Contact>(`getContact id=${id}`))
      );
    // 
  }

  createContact(contact: Contact): Observable<Contact> {
    // 
    console.log("createContact(contact) - START: " + JSON.stringify(contact));
    // 
    return this.http.post<Contact>(`${environment.apiUrl}/contact`, contact, this.httpOptions)
    .pipe(
      tap((newContact: Contact) => console.log(`created contact w/ id=${newContact.id}`)),
      catchError(this.err.handleError<Contact>('createContact'))
    );
    // 
  }

  /** PATCH: update the hero on the server */
  updateContact(id: string, contact: Contact): Observable<Contact> {
    // 
    console.log("contacts service - update contact - id: " + JSON.stringify(id)); 
    console.log("contacts service - update contact - contact: " + JSON.stringify(contact));
    // 
    return this.http.patch(`${environment.apiUrl}/contact/${id}`, contact, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated contact id=${id}`)),
      catchError(this.err.handleError<any>('updateContact'))
    );  
    // 
  }

  /** DELETE: delete the contact from the server */
  deleteContact(id: string): Observable<any> {
    // 
    console.log("deleteContact(id) - START: " + JSON.stringify(id));
    // 
    return this.http.delete(`${environment.apiUrl}/contact/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted contact id=${id}`)),
      catchError(this.err.handleError<Contact>('deleteContact'))
    );
    // 
  }

} 
