import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from '../Models/task.model';
import { CommonModule } from '@angular/common';
import { AlertService } from '../Service/alert.service';
import { TaskService } from '../Service/tasks.service';
import { AuthService } from '../Service/auth.service';
import { NotificationService } from '../Service/notification.service';

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
  constructor(
    private alertService: AlertService, 
    private taskService: TaskService, 
    public authService: AuthService, 
    public notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadTask();

    // Escuchar el evento de actualización de tareas
    this.notificationService.listen('actualizacion-tareas').subscribe((data) => {
      // Mostrar mensaje de notificación
      this.alertService.showAlert(data.message + ' ' + data.task.title, 'success');

      // Actualizar la lista de tareas en tiempo real
      if (data.task) {
        this.tasks.push(data.task);
      }
    });

    this.notificationService.listen('tarea-eliminada').subscribe((data) => {
      this.tasks = this.tasks.filter((task) => task._id !== data.id);
      this.alertService.showAlert(data.message + ' ' + data.task.title, 'success');
    });

    this.notificationService.listen('tarea-actualizada').subscribe((data) => {
      const index = this.tasks.findIndex((task) => task._id === data.task.id);
      if (index !== -1) {
        this.tasks[index] = data.task;
      }
      this.alertService.showAlert(data.message + ' ' + data.task.title, 'success');
    });
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
    const completed = !task.completed; 
    this.taskService.updateTask(task._id, completed).subscribe({
      next: (updatedTask) => {
        task.completed = updatedTask.completed; 
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
        this.tasks = this.tasks.filter(t => t._id !== task._id); 
        this.alertService.showAlert('Tarrea borrada', 'success');
      },
      error: (error) => {
        console.error('Error al eliminar la tarea', error);
      }
    });
  }

}
