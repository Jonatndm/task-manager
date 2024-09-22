import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskComponent } from "./task/task.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hola'
}
