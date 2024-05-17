import { Todo } from './../../models/todo';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  //--------------------------------------------
  title: String = 'ngTodo';

  selected: Todo | null = null;

  newTodo: Todo = new Todo();

  editTodo: Todo | null = null;

  todos: Todo[] = [];

  //--------------------------------------------

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.reload()
  }

  //--------------------------------------------

  getTodoCount(): Number {
    return this.todos.length;

  }

  displayTodo(todo: Todo): void {
    this.selected = todo;
  }

  displayTable(): void {
    this.selected = null;
  }

  addTodo(todo: Todo) {
    this.todoService.create(todo).subscribe({
      next: (todo) => {
        this.reload();
        this.newTodo = new Todo();
      },
      error: () => { }
    })
  }

  setEditTodo() {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo) {
    this.todoService.update(todo, todo.id).subscribe({
      next: (todo) => {
        this.reload();
        this.selected = null;
        this.editTodo = null;
      },
      error: () => { }
    });


  }

  deleteTodo(id: number) {
    this.todoService.destroy(id).subscribe({
      next: () => {
        this.reload();
      },
      error: () => { }
    });
    this.reload();;
  }

  reload() {
    this.todoService.index().subscribe({
      next: (dbTodos: Todo[]) => {
        console.log(dbTodos)
        this.todos = dbTodos
      },
      error: (err) => {
        console.log("something went wrong with reload()")
      }
    })
  }
}
