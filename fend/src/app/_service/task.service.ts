import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../_model/task/task.entity';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';
import { Card } from '../_model/card/card.entity';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private err: ErrorService,
  ) {
    console.log('constructor');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getTasks(): Observable<Task[]> { 
    // 
    console.log("getTasks - START");
    // 
    return this.http.get<Task[]>(`${environment.apiUrl}/task`)
      .pipe(
        tap(_ => console.log('fetched tasks')),
        catchError(this.err.handleError<Task[]>('getTasks', []))
      );
    // 
  };

  getTaskCount(): Observable<Card> {
    // 
    console.log("getTaskCount - START");
    // 
    // return this.http.get<any>(`${environment.apiUrl}/task/count`);
    console.log(`count path: ${environment.apiUrl}/task/count`);
    // 
    return this.http.get<Card>(`${environment.apiUrl}/task/count`, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched task count')),
      catchError(this.err.handleError<Card>('getTaskCount'))
    );
  }

  getTask(id: string): Observable<Task> {
    // 
    console.log("getTask(id) - START: " + JSON.stringify(id));
    // 
    return this.http.get<Task>(`${environment.apiUrl}/task/${id}`)
      .pipe(
        tap(_ => console.log(`fetched task id=${id}`)),
        catchError(this.err.handleError<Task>(`getTask id=${id}`))
      );
    // 
  }

  createTask(task: Task): Observable<Task> {
    // 
    console.log("createTask(task) - START: " + JSON.stringify(task));
    // 
    return this.http.post<Task>(`${environment.apiUrl}/task`, task, this.httpOptions)
    .pipe(
      tap((newTask: Task) => console.log(`created task w/ id=${newTask.id}`)),
      catchError(this.err.handleError<Task>('createTask'))
    );
    // 
  }

  /** PATCH: update the hero on the server */
  updateTask(id: string, task: Task): Observable<Task> {
    // 
    console.log("tasks service - update task - id: " + JSON.stringify(id)); 
    console.log("tasks service - update task - task: " + JSON.stringify(task));
    // 
    return this.http.patch(`${environment.apiUrl}/task/${id}`, task, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated task id=${task.id}`)),
      catchError(this.err.handleError<any>('updateTask'))
    );  
    // 
  }

  /** DELETE: delete the task from the server */
  deleteTask(id: string): Observable<any> {
    // 
    console.log("deleteTask(id) - START: " + JSON.stringify(id));
    // 
    return this.http.delete(`${environment.apiUrl}/task/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted task id=${id}`)),
      catchError(this.err.handleError<Task>('deleteTask'))
    );
    // 
  }

} 
