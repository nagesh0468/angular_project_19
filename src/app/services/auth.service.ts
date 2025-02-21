import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.firebaseApp);  

  constructor(private router: Router) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log('Login successful', userCredential.user);
        this.router.navigate(['/employees']);
      })
      .catch(error => console.error('Login error:', error));
  }

  register(name: string, email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Registration successful', user);

        // Update user profile with the name
        updateProfile(user, { displayName: name })
          .then(() => console.log('User profile updated'))
          .catch(error => console.error('Profile update error:', error));

        this.router.navigate(['/login']);
      })
      .catch(error => console.error('Registration error:', error));
  }
}
