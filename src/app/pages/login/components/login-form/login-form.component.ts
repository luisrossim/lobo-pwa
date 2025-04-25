import { Component, inject } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../utils/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, PasswordModule, InputTextModule, FloatLabel, ButtonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  protected readonly toastService = inject(ToastService);
  protected readonly authService = inject(AuthService);
  router = inject(Router);
  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  autenticar() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.actionsForLoginSuccess();
        },
        error: (err) => {
          this.toastService.error(err.error.message || "Erro na autenticação.")
        }
      })

    } else {
      this.toastService.error("Formulário inválido, tente novamente.")
    }
  }


  actionsForLoginSuccess(): void {
    this.toastService.success('Login realizado com successo.');
    this.router.navigateByUrl('estoque');
  }
}
