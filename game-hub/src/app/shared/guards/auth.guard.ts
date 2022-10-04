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
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private firebase: FirebaseService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(route);
    // console.log(state);

    switch (route.routeConfig!.path) {
      case 'login': {
        if (this.firebase.isLoggedUser()) {
          this.router.navigate(['/home']);
          return false;
        }
        break;
      }

      case 'register': {
        if (this.firebase.isLoggedUser()) {
          this.router.navigate(['/home']);
          return false;
        }
        break;
      }

      case 'profile/:id': {
        // const id = route.params['id'];
        if (!this.firebase.isLoggedUser()) {
          this.router.navigate(['/home']);
          return false;
        }
        break;
      }

      case 'profile-edit/:id': {
        const user = this.firebase.isLoggedUser();

        if (route.params['id'] !== user?.id) {
          this.router.navigate(['/home']);
          return false;
        }
        break;
      }
    }

    return true;
  }
}
