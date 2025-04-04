import { Component } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('slideTop', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(20px)'
        }),
        animate('500ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0px)'
        }))
      ])
    ])
  ]
})
export class LoginComponent {}
