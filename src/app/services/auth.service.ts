import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth); // ✅ Properly inject Auth
  user: User | null = null;

  constructor(private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  async register(name: string, email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }
      this.router.navigate(['/employees']);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/employees']);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
