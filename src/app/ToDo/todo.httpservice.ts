import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ToDo from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  private ApiURL: string = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.ApiURL}`);
  }

  getToDowithPagination(start: number, limit: number): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.ApiURL}?_start=${start}&_limit=${limit}`);
  }

  updateToDos(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`${this.ApiURL}/${todo.id}`, todo);
  }

  deleteToDos(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ApiURL}/${id}`);
  }

  createToDos(payload: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.ApiURL, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
