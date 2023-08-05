import { createAction, props } from '@ngrx/store';
import ToDo from './todo.model';

export const GetToDoAction = createAction('[ToDo] - Get ToDo');

export const CreateToDoAction = createAction(
  '[ToDo] - Create ToDo',
  props<ToDo>()
);

export const BeginGetToDoAction = createAction('[ToDo] - Begin Get ToDo');

export const SuccessGetToDoAction = createAction(
  '[ToDo] - Sucess Get ToDo',
  props<{ payload: ToDo[] }>()
);

export const BeginCreateToDoAction = createAction(
  '[ToDo] - Begin Create ToDo',
  props<{ payload: ToDo }>()
);

export const SuccessCreateToDoAction = createAction(
  '[ToDo] - Sucess Create ToDo',
  props<{ payload: ToDo }>()
);

export const updateTodo = createAction('[Todo] Update Todo', props<{ payload: ToDo }>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ todoId: number }>());
export const updateTodoInTable = createAction('[Todo] Update Todo In Table', props<{ payload: ToDo }>());
export const deleteTodoInTable = createAction('[Todo] Delete Todo In Table', props<{ todoId: number }>());

export const ErrorToDoAction = createAction('[ToDo] - Error', props<Error>());
