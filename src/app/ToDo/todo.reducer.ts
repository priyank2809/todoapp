import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from './todo.action';
import ToDo from './todo.model';
import ToDoState, { initializeState } from './todo.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(ToDoActions.GetToDoAction, state => state),
  on(ToDoActions.CreateToDoAction, (state: ToDoState, todo: ToDo) => {
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),

  on(ToDoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  on(ToDoActions.updateTodo, (state, { payload }) => ({ ...state, todos: state.ToDos.map(item => (item.id === payload.id ? payload : item)) })),
  on(ToDoActions.deleteTodo, (state, { todoId }) => ({ ...state, todos: state.ToDos.filter(item => item.id !== todoId) })),
  on(ToDoActions.updateTodoInTable, (state, { payload }) => ({ ...state, todos: state.ToDos.map(item => (item.id === payload.id ? payload : item)) })),
  on(ToDoActions.deleteTodoInTable, (state, { todoId }) => ({ ...state, todos: state.ToDos.filter(item => item.id !== todoId) })),
  on(ToDoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
    return { ...state, ToDoError: error };
  })
);

export function ToDoReducer(
  state: ToDoState | undefined,
  action: Action
): ToDoState {
  return reducer(state, action);
}
