import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  email = '';
  password = '';
  confirmPassword = '';
  
  mostrarPassword = false;
  mostrarConfirmPassword = false;
  
  mensajeErrorEmail = '';
  mensajeErrorPassword = '';
  formularioEnviado = false;

  constructor(private router: Router) {}

  togglePassword() { this.mostrarPassword = !this.mostrarPassword; }
  toggleConfirmPassword() { this.mostrarConfirmPassword = !this.mostrarConfirmPassword; }

  esEmailValido(email: string): boolean {
    const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return patron.test(email);
  }

  registrar() {
    this.mensajeErrorEmail = '';
    this.mensajeErrorPassword = '';

    if (!this.email || !this.password || !this.confirmPassword) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!this.esEmailValido(this.email)) {
      this.mensajeErrorEmail = "Formato de correo inválido.";
      return;
    }

    if (this.password.length < 8) {
      this.mensajeErrorPassword = "Mínimo 8 caracteres.";
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    this.formularioEnviado = true;
    this.router.navigate(['/perfil'], { 
      state: { datosRegistro: { email: this.email, password: this.password } } 
    });
  }

  canDeactivate(): boolean {
    if (this.formularioEnviado) return true;
    if (this.email !== '' || this.password !== '' || this.confirmPassword !== '') {
      return false; 
    }
    return true;
  }
}