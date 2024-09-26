import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskComponent } from "./task/task.component";
import { AlertComponent } from "./alert/alert.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponent, RouterModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hola'
}
