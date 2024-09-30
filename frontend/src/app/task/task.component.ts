import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from './task.model';
import { CommonModule } from '@angular/common';
import { AlertService } from '../alert.service';
import { TaskService } from '../Service/tasks.service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  newTask: Task = {
    _id: '',
    title: '',
    description: '',
    completed: false,
  }

  //Constructor para inicializar los servicios
  constructor(private alertService: AlertService, private taskService: TaskService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadTask();
  }

  //Cargar las tareas
  loadTask(){
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks
      },
      error: (error) => {
        this.alertService.showAlert('Error al cargar las tareas', 'error');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
  //Metodo de agregar tareas
  addTask(): void{
    if (this.newTask.title && this.newTask.description) {
      this.taskService.createTask(this.newTask.title, this.newTask.description).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.alertService.showAlert('Tarea agregada!', 'success');
          this.newTask = {_id: '', title: '', description: '', completed: false};
        },
        error: (error) => {
          console.error('Error al crear la tarea', error);
        }
      });
    } else {
      console.error('El título y la descripción no pueden estar vacíos');
    }
  }
  
  //Metodo para alternar si una tarea es completada
  markAsCompleted(task: any): void{
    const completed = !task.completed;  // Alterna el estado completado
    this.taskService.updateTask(task._id, completed).subscribe({
      next: (updatedTask) => {
        task.completed = updatedTask.completed;  // Actualiza el estado de la tarea en la interfaz
      },
      error: (error) => {
        console.error('Error al actualizar la tarea', error);
      }
    });
  }

  //Metodo para borrar una tarea
  deleteTask(task: Task): void{
    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t._id !== task._id);  // Actualiza la lista de tareas
      },
      error: (error) => {
        console.error('Error al eliminar la tarea', error);
      }
    });
  }

}
