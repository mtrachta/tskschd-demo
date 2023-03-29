import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activity } from '../_model/activity/activity.entity';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';
import { Card } from '../_model/card/card.entity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient,
    private err: ErrorService,
  ) {
    console.log('constructor');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getActivities(): Observable<Activity[]> { 
    // 
    console.log("getActivitys - START");
    // 
    return this.http.get<Activity[]>(`${environment.apiUrl}/activity`)
      .pipe(
        tap(_ => console.log('fetched activitys')),
        catchError(this.err.handleError<Activity[]>('getActivitys', []))
      );
    // 
  };

  getActivityCount(): Observable<Card> {
    // 
    console.log("getActivityCount - START");
    // 
    // return this.http.get<any>(`${environment.apiUrl}/activity/count`);
    console.log(`count path: ${environment.apiUrl}/activity/count`);
    // 
    return this.http.get<Card>(`${environment.apiUrl}/activity/count`, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched activity count')),
      catchError(this.err.handleError<Card>('getActivityCount'))
    );
  }

  getActivity(id: string): Observable<Activity> {
    // 
    console.log("getActivity(id) - START: " + JSON.stringify(id));
    // 
    return this.http.get<Activity>(`${environment.apiUrl}/activity/${id}`)
      .pipe(
        tap(_ => console.log(`fetched activity id=${id}`)),
        catchError(this.err.handleError<Activity>(`getActivity id=${id}`))
      );
    // 
  }

  createActivity(activity: Activity): Observable<Activity> {
    // 
    console.log("createActivity(activity) - START: " + JSON.stringify(activity));
    // 
    return this.http.post<Activity>(`${environment.apiUrl}/activity`, activity, this.httpOptions)
    .pipe(
      tap((newActivity: Activity) => console.log(`created activity w/ id=${newActivity.id}`)),
      catchError(this.err.handleError<Activity>('createActivity'))
    );
    // 
  }

  /** PATCH: update the hero on the server */
  updateActivity(id: string, activity: Activity): Observable<Activity> {
    // 
    console.log("activitys service - update activity - id: " + JSON.stringify(id)); 
    console.log("activitys service - update activity - activity: " + JSON.stringify(activity));
    // 
    return this.http.patch(`${environment.apiUrl}/activity/${id}`, activity, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated activity id=${activity.id}`)),
      catchError(this.err.handleError<any>('updateActivity'))
    );  
    // 
  }

  /** DELETE: delete the activity from the server */
  deleteActivity(id: string): Observable<any> {
    // 
    console.log("deleteActivity(id) - START: " + JSON.stringify(id));
    // 
    return this.http.delete(`${environment.apiUrl}/activity/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted activity id=${id}`)),
      catchError(this.err.handleError<Activity>('deleteActivity'))
    );
    // 
  }

} 
