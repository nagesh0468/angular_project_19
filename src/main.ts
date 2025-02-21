import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app'; // ✅ Initialize Firebase
import { environment } from './environments/environment';
import { AuthService } from './app/services/auth.service';

// ✅ Initialize Firebase before using any services
initializeApp(environment.firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    AuthService // ✅ Provide AuthService globally
  ]
}).catch(err => console.error(err));
