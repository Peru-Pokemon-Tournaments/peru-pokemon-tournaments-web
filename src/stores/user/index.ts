import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { ResponseError } from "@/services/interfaces/reponse-error";
import { User } from "@/models/user.model";

const toast = useToast();

export const useUserStore = defineStore("user", {
  state() {
    return {
      registerUserSuccessful: false,
      user: null as User | null,
      token: null as string | null,
    };
  },
  getters: {
    isRegisterUserSuccessfully(): boolean {
      return this.registerUserSuccessful;
    },
    isLoggedIn(): boolean {
      return this.user !== null;
    },
  },
  actions: {
    async registerUser({
      firstName,
      lastName,
      name,
      email,
      password,
      repeatedPassword,
    }: {
      firstName: string;
      lastName: string;
      name: string;
      email: string;
      password: string;
      repeatedPassword: string;
    }): Promise<void> {
      if (password != repeatedPassword) {
        toast.error("Contraseña repetida diferente");
        return;
      }

      try {
        const message = await this.authService.registerUser({
          firstName,
          lastName,
          name,
          email,
          password,
        });
        toast.success(message);

        this.registerUserSuccessful = true;

        setTimeout(() => {
          this.registerUserSuccessful = false;
        }, 1000);
      } catch (error: any | ResponseError) {
        toast.error(error.fullErrorMessage);
      }
    },
    async loginUser({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<void> {
      try {
        const userToken = await this.authService.login(email, password);

        this.user = userToken.user;
        this.token = userToken.token;

        toast.success(userToken.message);
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      }
    },
  },
});
