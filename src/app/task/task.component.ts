import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from './task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks: Task[] = [];

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    completed: false,
  }

  onSubmit(): void{
    //Agregar el Id como la fecha para que sea unico -- cambiar luego
    this.newTask.id = Date.now();
    //Agregar la nueva tarea a la lista de tareas
    this.tasks.push({...this.newTask});
    console.log(this.newTask);

    //Resetear el formulario
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      completed: false,
    }

  }
  
  //Metodo para alternar si una tarea es completada
  markAsCompleted(task: Task): void{
    task.completed = !task.completed;
  }

  //Metodo para borrar una tarea
  deleteTask(task: Task): void{
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
}
