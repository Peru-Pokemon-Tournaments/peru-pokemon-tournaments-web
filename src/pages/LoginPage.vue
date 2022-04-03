<template>
  <the-centered-layout id="layout">
    <base-card id="card">
      <template v-slot:header>
        <router-link to="/">
          <base-picture id="logo" :src="logoImageAsset" height="150" />
        </router-link>
        <base-title> Ingresar </base-title>
      </template>
      <form @submit.prevent="submit">
        <base-label> Correo electrónico </base-label>
        <base-input v-model="email" type="email" />
        <base-label> Contraseña </base-label>
        <base-input v-model="password" type="password" />
        <footer>
          <base-button> Iniciar sesión </base-button>
          <router-link to="/register">Registrarse</router-link>
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
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    logoImageAsset() {
      return require("@/assets/img/logo.png");
    },
  },
  methods: {
    ...mapActions(useUserStore, ["loginUser"]),
    async submit(): Promise<void> {
      await this.loginUser({
        email: this.email,
        password: this.password,
      });
      this.$router.push({
        name: "Home",
      });
    },
    clearForm(): void {
      this.email = "";
      this.password = "";
    },
  },
  watch: {
    isLoggedIn() {
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
  min-width: 15rem;
  max-width: 25rem;
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
