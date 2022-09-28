import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class CanLoginGuard implements CanActivate {
  constructor(private router: Router, private firebase: FirebaseService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.firebase.isLoggedUser()) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
