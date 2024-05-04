import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { IUser } from '../../types/interface/user.interface';
import { AlertService } from '../../services/alert.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatButtonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.8) translateY(-5rem)' }),
        animate(
          '1s ease-in-out',
          style({ opacity: 1, transform: 'scale(1.1) translateX(0%)' })
        ),
        animate('0.4s ease-in-out', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class SignInComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    token: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {}

  onLogin(): void {
    this.userService
      .getUser({
        username: this.loginForm.value.username,
        token: this.loginForm.value.token,
      })
      .subscribe({
        next: (user: IUser) => {
          this.tokenService.setToken(
            user.login,
            this.loginForm.value.token,
            '/dashboard'
          );
          this.alertService.showAlert('success', 'Login successful');
        },
        error: (err) => {
          console.log(err);
          this.alertService.showAlert('error', 'Invalid credentials');
        },
      });
  }
}
