<template>
  <the-centered-layout id="layout">
    <base-card id="card">
      <template v-slot:header>
        <router-link to="/">
          <base-picture id="logo" :src="logoImageAsset" height="150" />
        </router-link>
        <base-title> Registro </base-title>
      </template>
      <form @submit.prevent="submit">
        <base-label> Nombres </base-label>
        <base-input v-model="firstName" type="text" />
        <base-label> Apellidos </base-label>
        <base-input v-model="lastName" type="text" />
        <base-label> Nombre de usuario </base-label>
        <base-input v-model="username" type="text" />
        <base-label> Correo electrónico </base-label>
        <base-input v-model="email" type="email" />
        <base-label> Contraseña </base-label>
        <base-input v-model="password" type="password" />
        <base-label> Repetir contraseña </base-label>
        <base-input v-model="repeatedPassword" type="password" />
        <footer>
          <base-button> Registrarme </base-button>
          <router-link to="/login">Iniciar Sesión</router-link>
        </footer>
      </form>
    </base-card>
  </the-centered-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import TheCenteredLayout from "@/components/layouts/TheCenteredLayout.vue";

export default defineComponent({
  components: {
    TheCenteredLayout,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
    };
  },
  computed: {
    ...mapState(useUserStore, ["isRegisterUserSuccessfully"]),
    logoImageAsset() {
      return require("@/assets/img/logo.png");
    },
  },
  methods: {
    ...mapActions(useUserStore, ["registerUser"]),
    async submit(): Promise<void> {
      await this.registerUser({
        firstName: this.firstName,
        lastName: this.lastName,
        name: this.username,
        email: this.email,
        password: this.password,
        repeatedPassword: this.repeatedPassword,
      });
    },
    clearForm(): void {
      this.firstName = "";
      this.lastName = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.repeatedPassword = "";
    },
  },
  watch: {
    isRegisterUserSuccessfully() {
      this.clearForm();
    },
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
