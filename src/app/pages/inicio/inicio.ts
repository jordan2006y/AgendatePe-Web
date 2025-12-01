import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// 1. IMPORTAMOS LAS HERRAMIENTAS DE GOOGLE Y FIREBASE
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

  // 2. INYECTAMOS AUTH Y ROUTER EN EL CONSTRUCTOR
  constructor(private auth: Auth, private router: Router) {}

  // 3. LA FUNCIÓN MÁGICA PARA ENTRAR CON GOOGLE
  async loginConGoogle() {
    try {
      // Preparamos el proveedor (Google)
      const provider = new GoogleAuthProvider();

      // Abrimos la ventana emergente (Popup)
      const resultado = await signInWithPopup(this.auth, provider);
      
      // Si llegamos aquí, ¡éxito!
      console.log("Google Login Ok: ", resultado.user);
      alert(`¡Hola ${resultado.user.displayName}! Has entrado con Google.`);
      
      // Aquí podrías redirigirlo a donde quisieras
      // this.router.navigate(['/dashboard']); 

    } catch (error) {
      console.error("Error con Google: ", error);
      alert("Hubo un error al conectar con Google.");
    }
  }
}