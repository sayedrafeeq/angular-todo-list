import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list');
  protected todos = signal<Todo[]>([]);
  protected newTodoTitle = signal('');
  protected filter = signal<'all' | 'active' | 'completed'>('all');
  private nextId = 1;

  constructor() {
    // Load todos from localStorage on init
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.todos.set(parsed);
        this.nextId = Math.max(...parsed.map((t: Todo) => t.id), 0) + 1;
      } catch (e) {
        console.error('Failed to load todos', e);
      }
    }
  }

  protected get filteredTodos() {
    const current = this.todos();
    const filterValue = this.filter();
    switch (filterValue) {
      case 'active':
        return current.filter(t => !t.completed);
      case 'completed':
        return current.filter(t => t.completed);
      default:
        return current;
    }
  }

  addTodo() {
    const title = this.newTodoTitle().trim();
    if (title) {
      const newTodo: Todo = {
        id: this.nextId++,
        title,
        completed: false
      };
      this.todos.update(todos => [...todos, newTodo]);
      this.newTodoTitle.set('');
      this.saveTodos();
    }
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
    this.saveTodos();
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(t => t.id !== id));
    this.saveTodos();
  }

  clearCompleted() {
    this.todos.update(todos => todos.filter(t => !t.completed));
    this.saveTodos();
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos()));
  }

  protected get completedCount() {
    return this.todos().filter(t => t.completed).length;
  }

  protected get activeCount() {
    return this.todos().filter(t => !t.completed).length;
  }
}
