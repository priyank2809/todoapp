import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import ToDo from "../../todo.model";
import * as ToDoActions from "../../todo.action";
import ToDoState from "../../todo.state";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

    todo$: Observable<ToDoState>;
    todos: any;
    ToDoSubscription: Subscription;
    ToDoList: ToDo[] = [];
    todoError: Error = null;

    id: number;
    title: string = "";
    completed: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<{ todos: ToDoState }>
    ) {
        this.todo$ = store.pipe(select("todos"));
    }

    ngOnInit(): void {
        this.fetchTodo();
    }

    fetchTodo() {

        this.ToDoSubscription = this.todo$
            .pipe(
                map((x) => {
                    this.ToDoList = x.ToDos;
                    // console.log('this.ToDoList', this.ToDoList);

                    const todoId = this.route.snapshot.paramMap.get('id');
                    this.todos = this.ToDoList.find((todo) => todo.id === +todoId);
                    // this.id = this.todos.id;
                    // this.title = this.todos.title;
                    // this.completed = this.todos.completed;
                    this.todoError = x.ToDoError;
                    // console.log('this.todos', this.todos);
                })
            ).subscribe();

        this.store.dispatch(ToDoActions.BeginGetToDoAction());

        // const todoId = this.route.snapshot.paramMap.get('id');
        // this.todo$ = this.store.select((state) => {
        //     console.log('state', state);
        //     return state.todos.ToDos.find((todo) => {
        //         todo.id === +todoId
        //     });
        // });
    }

    onDelete(todoId: number): void {
        this.store.dispatch(ToDoActions.deleteTodo({ todoId }));
        this.router.navigate(['/list']);
    }

    onUpdate(todo: ToDo): void {
        console.log('todo', todo);
        this.store.dispatch(ToDoActions.updateTodo({ payload: todo }));
        this.router.navigate(['/list']);
    }
}
