import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from './task.model';
import { CommonModule } from '@angular/common';
import { AlertService } from '../alert.service';
import { TaskService } from '../Service/tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  tasks: Task[] = [];

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    completed: false,
  }

  //Constructor para inicializar los servicios
  constructor(private alertService: AlertService, private taskService: TaskService) {
    this.loadTask();
  }

  //Cargar las tareas
  loadTask(){
    this.tasks = this.taskService.getTasks();
  }

  //Metodo de agregar tareas
  addTask(){
    if(this.newTask.title && this.newTask.description){
      this.taskService.addTask(this.newTask);
      this.alertService.showAlert('Tarea agregada!', 'success');
      //limpiar formulario
      this.newTask = {
        id: 0,
        title: '',
        description: '',
        completed: false,
      } 
      this.loadTask();
    }
  }
  
  //Metodo para alternar si una tarea es completada
  markAsCompleted(task: any): void{
    this.taskService.markAsCompleted(task);
    this.loadTask();
  }

  //Metodo para borrar una tarea
  deleteTask(task: Task): void{
    this.taskService.deleteTask(task);
    this.alertService.showAlert('Tarea borrada!', 'warning');
    this.loadTask();
  }
}
