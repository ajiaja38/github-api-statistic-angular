import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { IUser } from '../../types/interface/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user!: IUser;

  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit() {
    this.userService.getAuthenticatedUser().subscribe({
      next: (user: IUser) => {
        this.user = user;
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }

  logout(): void {
    this.alertService.logoutAlert();
  }
}
