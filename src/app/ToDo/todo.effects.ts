import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as ToDoActions from './todo.action';
import { ToDoHttpService } from './todo.httpservice';
import ToDo from './todo.model';

@Injectable()
export class ToDoEffects {
  constructor(private todoService: ToDoHttpService, private action$: Actions) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetToDoAction),
      mergeMap(() =>
        // action._start && action._limit
        this.todoService.getToDos().pipe(
          map((data: ToDo[]) => {
            return ToDoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateToDoAction),
      mergeMap(action =>
        this.todoService.createToDos(action.payload).pipe(
          map((data: ToDo) => {
            return ToDoActions.SuccessCreateToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.updateTodo),
      mergeMap(({ payload }) => this.todoService.updateToDos(payload).pipe(
        map((data: ToDo) => {
          return ToDoActions.updateTodoInTable({ payload: data });
        }),
        catchError((error: Error) => {
          return of(ToDoActions.ErrorToDoAction(error));
        })
      ))
    )
  );

  deleteTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.deleteTodo),
      mergeMap(({ todoId }) => this.todoService.deleteToDos(todoId).pipe(
        map((todoId) => {
          return ToDoActions.deleteTodoInTable({ todoId });
        }),
        catchError((error: Error) => {
          return of(ToDoActions.ErrorToDoAction(error));
        })
      ))
    )
  );
}
