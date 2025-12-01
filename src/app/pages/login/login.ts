import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  mostrarPassword = false;
  loginExitoso = false;
  mensajeErrorEmail = '';
  mensajeErrorPassword = '';

  constructor(private auth: Auth, private router: Router) {}

  togglePassword() { this.mostrarPassword = !this.mostrarPassword; }

  esEmailValido(email: string): boolean {
    const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return patron.test(email);
  }

  async iniciarSesion() {
    this.mensajeErrorEmail = '';
    this.mensajeErrorPassword = '';

    if (!this.email || !this.password) {
      alert("Por favor completa los campos.");
      return;
    }

    if (!this.esEmailValido(this.email)) {
      this.mensajeErrorEmail = "El correo no es válido.";
      return;
    }

    if (this.password.length < 8) {
      this.mensajeErrorPassword = "La contraseña debe tener al menos 8 caracteres.";
      return;
    }

    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.loginExitoso = true;
      alert("¡Bienvenido de nuevo!");
      this.router.navigate(['/']); 
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        this.mensajeErrorPassword = "La contraseña es incorrecta o usuario no existe.";
      } else if (error.code === 'auth/user-not-found') {
        this.mensajeErrorEmail = "Este correo no está registrado.";
      } else {
        alert("Ocurrió un error inesperado.");
      }
    }
  }

  canDeactivate(): boolean {
    if (this.loginExitoso) return true;
    if (this.email !== '' || this.password !== '') {
      return false;
    }
    return true;
  }
}