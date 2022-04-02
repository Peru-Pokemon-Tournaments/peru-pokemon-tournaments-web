<template>
  <the-centered-layout id="layout">
    <the-card id="card">
      <template v-slot:header>
        <the-picture id="logo" :src="logoImageAsset" height="150" />
        <the-title> Registro </the-title>
      </template>
      <form @submit.prevent="submit">
        <the-label> Nombres </the-label>
        <the-input v-model="firstName" type="text" />
        <the-label> Apellidos </the-label>
        <the-input v-model="lastName" type="text" />
        <the-label> Nombre de usuario </the-label>
        <the-input v-model="username" type="text" />
        <the-label> Correo electrónico </the-label>
        <the-input v-model="email" type="email" />
        <the-label> Contraseña </the-label>
        <the-input v-model="password" type="password" />
        <the-label> Repetir contraseña </the-label>
        <the-input v-model="repeatedPassword" type="password" />
        <footer>
          <the-button> Enviar </the-button>
        </footer>
      </form>
    </the-card>
  </the-centered-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import TheButton from "@/components/ui/buttons/TheButton.vue";
import TheCenteredLayout from "@/components/layouts/TheCenteredLayout.vue";
import TheCard from "@/components/ui/cards/TheCard.vue";
import TheLabel from "@/components/ui/semantics/TheLabel.vue";
import ThePicture from "@/components/ui/images/ThePicture.vue";
import TheInput from "@/components/ui/inputs/TheInput.vue";
import TheTitle from "@/components/ui/semantics/TheTitle.vue";

export default defineComponent({
  components: {
    TheButton,
    TheCard,
    TheCenteredLayout,
    TheLabel,
    ThePicture,
    TheInput,
    TheTitle,
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
  min-width: 15rem;
  max-width: 25rem;
}

#logo {
  margin: 0 auto;
}

footer {
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
}
</style>
