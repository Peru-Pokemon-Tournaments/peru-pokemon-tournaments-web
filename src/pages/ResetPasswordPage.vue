<template>
  <the-centered-layout id="layout">
    <base-card id="card">
      <template v-slot:header>
        <router-link to="/">
          <base-picture id="logo" :src="logoImageAsset" height="150" />
        </router-link>
        <br />
        <base-title> Cambiar contraseña </base-title>
      </template>
      <form @submit.prevent="submit">
        <base-label> Nueva contraseña </base-label>
        <base-input v-model="newPassword" type="password" />
        <base-label> Repetir contraseña </base-label>
        <base-input v-model="newPasswordRepeated" type="password" />
        <footer>
          <span v-if="isUpdatingPassword">Actualizando contraseña...</span>
          <base-button v-else> Cambiar contraseña </base-button>
          <router-link to="/login">Iniciar sesión</router-link>
        </footer>
      </form>
    </base-card>
  </the-centered-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapState } from "pinia";
import { usePasswordStore } from "@/stores/password";
import TheCenteredLayout from "@/components/layouts/TheCenteredLayout.vue";

export default defineComponent({
  components: {
    TheCenteredLayout,
  },
  data() {
    return {
      newPassword: "",
      newPasswordRepeated: "",
    };
  },
  computed: {
    ...mapState(usePasswordStore, [
      "isUpdatingPassword",
      "isSuccessfullyUpdatedPassword",
    ]),
    logoImageAsset() {
      return require("@/assets/img/logo.png");
    },
  },
  methods: {
    ...mapActions(usePasswordStore, ["updatePassword"]),
    submit(): void {
      const { token, email } = this.$route.query;

      this.updatePassword(
        email as string,
        token as string,
        this.newPassword,
        this.newPasswordRepeated
      );
    },
    clearForm(): void {
      this.newPassword = "";
      this.newPasswordRepeated = "";
    },
  },
  watch: {
    isSuccessfullyUpdatedPassword() {
      if (this.isSuccessfullyUpdatedPassword) {
        this.clearForm();
        this.$router.push({
          name: "Login",
        });
      }
    },
  },
  created(): void {
    const { token, email } = this.$route.query;

    if (!token || !email) {
      this.$router.push({
        name: "Login",
      });
    }
  },
});
</script>

<style lang="scss" scoped>
#layout {
  background-color: $base-secondary-background-color;
}

#card {
  width: 60%;
  min-width: 20rem;
  max-width: 25rem;

  @media (max-width: 400px) {
    min-width: auto;
    width: 100%;
  }
}

#logo {
  margin: 0 auto;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 0.8rem;
  gap: 0.5rem;
}
</style>
