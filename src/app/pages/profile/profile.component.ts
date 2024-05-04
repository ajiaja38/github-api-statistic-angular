import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../types/interface/user.interface';
import { AlertService } from '../../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  animations: [
    trigger('slideInFromLeftSvg', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-5rem) translateY(-5rem)' }),
        animate(
          '1.5s ease-in-out',
          style({ opacity: 1, transform: 'translateX(0%)' })
        ),
      ]),
    ]),
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-5rem)' }),
        animate(
          '1s ease-in-out',
          style({ opacity: 1, transform: 'translateX(0%)' })
        ),
      ]),
    ]),
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
export class ProfileComponent {
  user!: IUser;

  updateProfileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  ngAfterViewInit() {
    this.initFormValue();
  }

  getUser(): void {
    this.userService.getAuthenticatedUser().subscribe({
      next: (user: IUser) => {
        this.user = user;
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }

  alertUpdateProfile(): void {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda yakin ingin update profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateProfile();
      }
    });
  }

  updateProfile(): void {
    this.userService
      .updateUser({
        name: this.updateProfileForm.value.name,
        bio: this.updateProfileForm.value.bio,
        location: this.updateProfileForm.value.location,
      })
      .subscribe({
        next: (user: IUser) => {
          this.user = user;
          this.alertService.showAlert(
            'success',
            'Profile updated successfully'
          );
        },
        error: (err: HttpErrorResponse) => {
          this.alertService.showAlert('error', err.message);
        },
      });
  }

  initFormValue(): void {
    this.updateProfileForm.setValue({
      name: this.user.name,
      bio: this.user.bio,
      location: this.user.location,
    });
  }
}
