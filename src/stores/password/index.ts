import { ResponseError } from "@/services/interfaces/reponse-error";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const usePasswordStore = defineStore("password", {
  state() {
    return {
      sendingResetPasssword: false as boolean,
      successSendingResetPassword: false as boolean,
      updatingPasssword: false as boolean,
      successUpdatePassword: false as boolean,
    };
  },
  getters: {
    isSendingResetPassword(): boolean {
      return this.sendingResetPasssword;
    },
    isSuccesfullySendedResetPassword(): boolean {
      return this.successSendingResetPassword;
    },
    isUpdatingPassword(): boolean {
      return this.updatingPasssword;
    },
    isSuccessfullyUpdatedPassword(): boolean {
      return this.successUpdatePassword;
    },
  },
  actions: {
    async sendResetPassword(email: string): Promise<void> {
      this.sendingResetPasssword = true;
      try {
        const message = await this.authService.resetPassword(email);
        this.successSendingResetPassword = true;

        setTimeout(() => {
          this.successSendingResetPassword = false;
        }, 2000);

        toast.success(message);
      } catch (error: any | ResponseError) {
        toast.error(error.fullErrorMessage);
      } finally {
        this.sendingResetPasssword = false;
      }
    },
    async updatePassword(
      email: string,
      token: string,
      newPassword: string,
      newPasswordRepeated: string
    ): Promise<void> {
      if (newPassword != newPasswordRepeated) {
        toast.error("Contraseñas repetidas diferentes");
        return;
      }

      this.updatingPasssword = true;
      try {
        const message = await this.authService.updatePassword(
          email,
          token,
          newPassword
        );
        this.successUpdatePassword = true;

        setTimeout(() => {
          this.successUpdatePassword = false;
        }, 2000);

        toast.success(message);
      } catch (error: any | ResponseError) {
        toast.error(error.fullErrorMessage);
      } finally {
        this.updatingPasssword = false;
      }
    },
  },
});
