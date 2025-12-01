import 'zone.js';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// 2. PEGA AQUÍ TUS CÓDIGOS DE FIREBASE (Sácalos de tu google-services.json o la consola)
const firebaseConfig = {
  apiKey: "AIzaSyAcPcqsz6PsfjVGWHBTOOZ3_4cYGLXkx48",              // Busca esto en tu google-services.json
  authDomain: "agendatepe.firebaseapp.com", // Tu project_id + .firebaseapp.com
  projectId: "agendatepe",                // Tu project_id
  storageBucket: "agendatepe.appspot.com",
  messagingSenderId: "966542507563",      // Tu project_number
  appId: "1:966542507563:web:273c293c7fa5c23f0ff46e"     // Tu mobilesdk_app_id
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    
    // 3. AQUÍ ENTREGAMOS LA LLAVE A LA APP
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};