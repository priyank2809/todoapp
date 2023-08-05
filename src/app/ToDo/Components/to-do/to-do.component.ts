import { Component, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as ToDoActions from "../../todo.action";
import ToDo from "../../todo.model";
import ToDoState from "../../todo.state";
import { ToDoHttpService } from '../../todo.httpservice';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: "app-to-do",
    templateUrl: "./to-do.component.html",
    styleUrls: ["./to-do.component.scss"],
})
export class ToDoComponent implements OnInit {

    todo$: Observable<ToDoState>;
    ToDoSubscription: Subscription;
    toDos: ToDo[] = [];
    ToDoList: ToDo[] = [];

    id: number;
    title: string = "";
    completed: boolean = false;

    todoError: Error = null;

    pageNo = 0;
    pageSize = 5;
    pageSizeOptions = [5, 10, 25, 50, 100];
    totalCount: number;

    dataSource: MatTableDataSource<ToDo> = new MatTableDataSource<ToDo>();
    displayedColumns: string[] = ['id', 'title', 'completed', 'actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private store: Store<{ todos: ToDoState }>,
        private todoService: ToDoHttpService
    ) {
        this.todo$ = store.pipe(select("todos"));
    }

    ngOnInit() {
        this.ToDoSubscription = this.todo$
            .pipe(
                map((x) => {
                    this.ToDoList = x.ToDos;
                    this.totalCount = x.ToDos.length;
                    // console.log('todoList', this.toDos);
                    this.todoError = x.ToDoError;
                })
            )
            .subscribe();

        this.store.dispatch(ToDoActions.BeginGetToDoAction());

        this.getToDos(this.pageNo, this.pageSize);
    }

    getToDos(pageNo, pageSize) {
        this.todoService.getToDowithPagination(pageNo, pageSize).subscribe((resp: any) => {
            if (resp) {
                this.ToDoList = resp;
                this.dataSource.data = this.ToDoList;
            } else {
                this.dataSource.data = [];
            }
        });
    }

    createToDo() {
        const todo: ToDo = { id: this.id, title: this.title, completed: this.completed };
        this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
        this.title = "";
        this.completed = false;
    }

    onUpdate(todo: ToDo) {
        this.store.dispatch(ToDoActions.updateTodo({ payload: todo }));
    }

    onDelete(todoId: number) {
        console.log('todoId', todoId);
        this.store.dispatch(ToDoActions.deleteTodo({ todoId }));
    }

    handlePagination(event) {
        const pageNo = event.currentPage;
        const pageSize = event.pageSize;
        this.getToDos(pageNo, pageSize);
    }

    ngOnDestroy() {
        if (this.ToDoSubscription) {
            this.ToDoSubscription.unsubscribe();
        }
    }
}
