import { Injectable } from "@angular/core";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  
  //Obtener las tareas del localstorage
  getTasks(): Task[]{
    const username = localStorage.getItem('username');
    const tasks = localStorage.getItem(`${username}_tasks`);
    return tasks ? JSON.parse(tasks) : [];
  }

  //Guardar las tareas en el localstorage
  saveTasks(tasks: Task[]):void {
    const username = localStorage.getItem('username');
    localStorage.setItem(`${username}_tasks`, JSON.stringify(tasks));
  }
   // Obtener el siguiente ID único
   getNextId(): number {
    const tasks = this.getTasks();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
    return maxId + 1;
  }
  //Agregar las tareas a la listas
  addTask(task: Task):void{
    const tasks = this.getTasks();
    task.id = this.getNextId();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  //Marcar como completada las tareas
  markAsCompleted(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.title === task.title);
    if (index > -1) {
      tasks[index].completed = !tasks[index].completed;
      this.saveTasks(tasks);
    }
  }

  //Borrar tareas 
  deleteTask(task: any): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(t => t.title !== task.title);
    this.saveTasks(tasks);
  }
} 