import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  showAlert(icon: 'success' | 'error' | 'warning', title: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon,
      title,
    });
  }

  logoutAlert(): void {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Apakah anda yakin ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenService.logout();
        this.router.navigateByUrl('/');
      }
    });
  }
}
