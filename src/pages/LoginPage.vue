<template>
  <the-centered-layout id="layout">
    <the-card id="card">
      <template v-slot:header>
        <the-picture id="logo" :src="logoImageAsset" height="150" />
        <the-title> Ingresar </the-title>
      </template>
      <form @submit.prevent="submit">
        <the-label> Correo electrónico </the-label>
        <the-input v-model="email" type="email" />
        <the-label> Contraseña </the-label>
        <the-input v-model="password" type="password" />
        <footer>
          <base-button> Iniciar sesión </base-button>
          <router-link to="/register">Registrarse</router-link>
        </footer>
      </form>
    </the-card>
  </the-centered-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import BaseButton from "@/components/ui/buttons/BaseButton.vue";
import TheCenteredLayout from "@/components/layouts/TheCenteredLayout.vue";
import TheCard from "@/components/ui/cards/TheCard.vue";
import TheLabel from "@/components/ui/semantics/TheLabel.vue";
import ThePicture from "@/components/ui/images/ThePicture.vue";
import TheInput from "@/components/ui/inputs/TheInput.vue";
import TheTitle from "@/components/ui/semantics/TheTitle.vue";

export default defineComponent({
  components: {
    BaseButton,
    TheCard,
    TheCenteredLayout,
    TheLabel,
    ThePicture,
    TheInput,
    TheTitle,
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
}
</style>
