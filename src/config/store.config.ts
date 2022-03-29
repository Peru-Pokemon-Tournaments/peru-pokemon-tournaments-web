import { AuthService } from "@/services/auth.service";
import "pinia";

declare module "pinia" {
  export interface PiniaCustomProperties {
    authService: AuthService;
  }
}
