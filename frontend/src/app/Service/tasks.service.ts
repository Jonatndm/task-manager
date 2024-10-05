import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
  
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}
  //Obtener las tareas del localstorage
  getTasks(): Observable<any>{
    return this.http.get(this.apiUrl, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  //Guardar las tareas en el localstorage
  createTask(title: string, description: string): Observable<any> {
    return this.http.post(this.apiUrl, { title, description }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  //Actualizar completada
  updateTask(id: string, completed: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { completed }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Envía el token JWT
      }
    });
  }

  //Eliminar tarea
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

} 