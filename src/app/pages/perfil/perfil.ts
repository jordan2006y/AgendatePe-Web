import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  nombre = '';
  telefono = '';
  email = '';
  private password = '';
  
  fotoPreview: string | ArrayBuffer | null = null;
  archivoSeleccionado: File | null = null;
  
  guardadoExitoso = false;
  mensajeErrorTelefono = '';
  mensajeErrorNombre = '';

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    const navigation = history.state;
    if (navigation.datosRegistro) {
      this.email = navigation.datosRegistro.email;
      this.password = navigation.datosRegistro.password;
    } else {
      alert("Debes iniciar el proceso de registro primero.");
      this.router.navigate(['/registro']);
    }
  }

  seleccionarFoto(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.archivoSeleccionado = archivo;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoPreview = reader.result;
      };
      reader.readAsDataURL(archivo);
    }
  }

  // --- VALIDACIONES ---
  esCelularValido(telefono: string): boolean {
    const patron = /^9[0-9]{8}$/;
    return patron.test(telefono);
  }

  validarNombre(nombre: string): boolean {
    const n = nombre.trim();
    if (n.length < 2) {
      this.mensajeErrorNombre = "El nombre es muy corto.";
      return false;
    }
    if (n.length > 50) {
      this.mensajeErrorNombre = "El nombre es demasiado largo.";
      return false;
    }
    const patronLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!patronLetras.test(n)) {
      this.mensajeErrorNombre = "El nombre solo debe contener letras.";
      return false;
    }
    return true;
  }

  async guardarPerfil() {
    this.mensajeErrorTelefono = '';
    this.mensajeErrorNombre = '';

    if (!this.nombre.trim() || !this.telefono.trim()) {
      alert("Por favor completa todos los datos.");
      return;
    }

    if (!this.validarNombre(this.nombre)) return;

    if (!this.esCelularValido(this.telefono)) {
      this.mensajeErrorTelefono = "El número debe ser de Perú (9XXXXXXXX).";
      return;
    }

    try {
      const credencialUsuario = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      
      if (credencialUsuario.user) {
        await updateProfile(credencialUsuario.user, {
          displayName: this.nombre.trim()
        });
      }

      this.guardadoExitoso = true;
      console.log("Cuenta creada");
      alert("¡Bienvenido! Tu cuenta ha sido creada y configurada.");
      this.router.navigate(['/']); 

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al crear la cuenta.");
    }
  }

  canDeactivate(): boolean {
    if (this.guardadoExitoso) return true;
    return false;
  }
}