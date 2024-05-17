import { HttpClient } from '@angular/common/http';
import { Todo } from './../models/todo';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = []

  private baseUrl = 'http://localhost:8084/'; // adjust port to match server
  private url = this.baseUrl + 'api/todos';


  constructor(private http: HttpClient) { }

  index(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('todoService.index(): error retrieving pokemon: ' + err)
        );
      })
    );
  }



  create(todo: Todo): Observable<Todo> {

    return this.http.post<Todo>(this.url, todo).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('todo.create(): error retrieving todo: ' + err)
        );
      })
    );
  }

  update(todo: Todo, id:number): Observable<Todo> {
    return this.http.put<Todo>(this.url + "/" + id, todo).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('todo.create(): error retrieving todo: ' + err)
        );
      })
    );
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(this.url + "/" + id).pipe(
      catchError((error: any) => {
        console.log(error);
        return throwError(
          () => new Error('todoService.delete(): error deleting todo' + error)
        );
      })
    );
  }




}
