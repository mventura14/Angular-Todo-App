import { Component } from '@angular/core';
import { Todo } from '../../models/todo';
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
export class TodoListComponent {
  title: String = 'ngTodo';

  selected: Todo | null = null;

  newTodo: Todo = new Todo();
  editTodo: Todo | null = null;

  todos: Todo[] = [
    new Todo(1, 'Go round mums', '', false),
    new Todo(2, 'Get Liz back', '', false),
    new Todo(3, 'Sort life out', '', false)
  ];

  getTodoCount(): Number {
    return this.todos.length;

  }

  displayTodo(todo: Todo): void {
    this.selected = todo;
  }

  displayTable(): void {
    this.selected = null;
  }

  addTodo(todo : Todo){
      todo.id = this.generateId();
      this.todos.push(todo)
  }

  generateId() {
    return this.todos[this.todos.length - 1].id + 1;
  }

  setEditTodo(){
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo : Todo){
    for(let i = 0; i < this.todos.length; i++){
      if(this.todos[i].id === todo.id){
        this.todos[i] = Object.assign({}, todo);
        this.selected = this.todos[i]
      }
    }
   this.editTodo = null;
  }
}
