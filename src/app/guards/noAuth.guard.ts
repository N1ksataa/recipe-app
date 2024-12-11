import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../user/user.service";
import { inject } from "@angular/core";

export const NoAuthGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isLogged) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};