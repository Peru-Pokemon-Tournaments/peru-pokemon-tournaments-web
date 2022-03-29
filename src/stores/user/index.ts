import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { ResponseError } from "@/services/interfaces/reponse-error";

const toast = useToast();

export const useUserStore = defineStore("user", {
  state() {
    return {
      registerUserSuccessful: false,
    };
  },
  getters: {
    isRegisterUserSuccessfully(): boolean {
      return this.registerUserSuccessful;
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
  },
});
